
const { generateDuitNowStr,breakDownQR } = require('duitnow-js')
const assert = require('assert')
const qrcode = require('qrcode-terminal')

// QR Code generated by MAE app
const string1 = '00020201021226690014A000000615000101065887340220MAEPP1111351701298070313169138867558252040000530345854041.005802MY5925MOHD SULAIMAN BIN HAJI SU6002MY62240520MAEPP1111351701298076304CE76'

const qr1 = generateDuitNowStr({
    account: 'MAEPP111135170129807', // temporary account number from MAE app
    app: '588734', // unknown ID from MAE app
    expiry: '1691388675582', // datetime in miliseconds
    amount: 1,
    name: 'MOHD SULAIMAN BIN HAJI SUDIRMAN',
    id62ref5: 'MAEPP111135170129807' // Reference Label

})

assert.equal(string1, qr1)

// QR Code generated on Kerusi Urut
const string2 = '00020201021126600014A00000061500010106890087022800000000000000000000000723395204739953034585802MY5925GINTELL REST N GO SDN BHD6015KEPONG MENJALAR610552200625305080.1626.00608168814510825Start machine via DuitNow82327FFC1AC00E99EA2D7A0D7BB79755736A63045CDC'

const qr2 = generateDuitNowStr({
    account: '0000000000000000000000072339',
    app: '890087', // unknown ID
    category: '7399', // unknown Merchant Category Code
    name: 'GINTELL REST N GO SDN BHD',
    city: 'KEPONG MENJALARA',
    postcode: '52200',
    id62ref5: '0.1626.0', // Reference Label
    id62ref6: '16881451', // Customer Label 
    id62ref8: 'Start machine via DuitNow', // Purpose of Transaction
    id62ref82: '7FFC1AC00E99EA2D7A0D7BB79755736A' // unknown Ref Number

})

assert.equal(string2, qr2)

// QR Code found on Google Image
const string4 = '00020201021126580014A000000615000101065641600226120710300065965RHBQR0240445204739953034585802MY5912NUNU APPAREL6002MY61051420062230309ROA050888070617303582649CA02A0851CC2F6B40C1DC180AA2A84A31475C58253CB22FD3EDAD88E8616FE563044660'

const qr4 = generateDuitNowStr({
    account: '120710300065965RHBQR024044',
    app: '564160', // unknown ID
    category: '7399', // unknown Merchant Category Code
    name: 'NUNU APPAREL',
    postcode: '14200',
    id62ref3: 'ROA050888', // Store Label 
    id62ref7: '173035', // Terminal Label 
    id62ref82: '9CA02A0851CC2F6B40C1DC180AA2A84A31475C58253CB22FD3EDAD88E8616FE5' // unknown Ref Number

})

assert.equal(string4, qr4)

// another QR Code generated by MAE app without a specified amount
const string3 = '00020201021126690014A000000615000101065887340220MAEPP111134456652251031316905900545775204000053034585802MY5925MOHD SULAIMAN BIN HAJI SU6002MY6304EE0C'

const qr3 = generateDuitNowStr({
    account: 'MAEPP111134456652251', // temporary account number from MAE app
    app: '588734', // unknown ID from MAE app
    // expiry: '1690590054577', // datetime in miliseconds
    name: 'TEST NAME DUITNOW'

})

// assert.equal(string3, qr3)


qrcode.generate(qr3); //Generate QR
// console.log(breakDownQR(qr3)); //breakdown the qr string
// generateHTMLPinkWhiteQR(qr3); //Generate QR in Pink, but only in html.


function generateHTMLPinkWhiteQR(qrString){
    const QRCode = require('qrcode');
    const fs = require('fs');

    // customizing the QR code color
    const options = {
    color: {
        dark: "#FF1493", // Pink color
        light: "#FFFFFF", // White background 
    },
    };

    // Generate QR Code as a base64 URL
    QRCode.toDataURL(qrString, options, function (err, url) {
    if (err) throw err;

    // Output the generated QR code URL (base64-encoded image)
    console.log("Generated QR Code URL:", url);

    // Create an HTML file to display the QR code image
    const html = `
        <html>
        <head>
            <title>Pink QR Code</title>
        </head>
        <body>
            <h1>Generated QR Code</h1>
            <img src="${url}" alt="Pink QR Code"/>
        </body>
        </html>
    `;

    // Save the HTML to a file
    fs.writeFileSync('pink-qr-code.html', html);
    console.log("HTML file saved as pink-qr-code.html");
    });
}
