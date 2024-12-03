
## DuitNow QR Code Generator Test

This is largely forked from (https://github.com/natsu90/duitnowqr-test).  
Researching DuitNowQR for future projects. You might wanna view his 'readMe' before continuing with mine.  
Compared to other projects of DuitNowQR, am very appreciative of his comprehensive yet concised readMe.
\
\
Thus far I.ve done...
1. breakDownQR function, to break down QR string, and show it in the form of list<dictionary>.
   - (Easier on the eyes)
2. generateHTMLPinkWhiteQR function, generate pink-white QR, saved in the form of HTML.
   - (Had trouble changing colour via qrcode.generate())
3. Add some additional fields based on the DuitNow standard v1.4
   - (remained remark/commented)
4. Lengthy explanation on how to understand QR string below

### How To Read QR String
```
Sample String: 00020201021126440014A0000006150001010689005302121102928373325204000053034585802MY5910JAMESONLAM6002MY6213060988866479363043A1C
1. 2 Char = ID
2. 2 Char = Length of value
3. Value

So... it's like [{id:"00", value:"02"}, {id:"01", value:"11"}, {id:"26", value:"0014A000000615000101068900530212110292837332"}, {id:"52", value:"0000"}, {id:"53", value:"458"}...]
id | length | values
00 |     02 | 02
01 |     02 | 11
26 |     44 | 0014A000000615000101068900530212110292837332
52 |     04 | 0000 
53 |     03 | 458


However, unlike id:26, its value is in array form... so we need to do the breaking down again
0014A000000615000101068900530212110292837332
id | length | values
00 |     14 | A0000006150001
01 |     06 | 890053
02 |     12 | 110292837332


Which ultimately becomes...
{id:"26", value: [{id:"00", value:"A0000006150001"},{id:"01", value:"890053"},{id:"02", value:"110292837332"}]}
```

### Usage

```
npm install gist:6ed0e8ddaab9c7dd9b38b053410cbcb0
```

```
const cimbDuitNow = "xxxx" ///replace "xxxx" with the string you received by scanning a DuitNow QR
console.log(breakDownQR(cimbDuitNow));  ///run this to breakdown the strings

results look smth like...
[
  { id: '00', value: '02' },
  { id: '01', value: '11' },
  { id: '26', value: '0014A000000615000101068900530212110292837332' },
  { id: '52', value: '0000' },
  { id: '53', value: '458' },
  { id: '58', value: 'MY' },
  { id: '59', value: 'JAMESONLAM' },
  { id: '60', value: 'MY' },
  { id: '62', value: '0609888664793' },
  { id: '63', value: '3A1C' }
]

Based on the results, fill in the values or set more arguments.
const qrCimbDuitNow = generateDuitNowStr({
    app: "xxxxx",
    account: "xxxxx",
    name: "xxxxx",
    id62ref: "xxx",
    id62ref82: "xxx"
})

```

### Tests

```
npm install

npm run test
```

### Output

![Test Output](/images/output.png "Test Output")

### Merchant Category Code

[https://global.alipay.com/docs/ac/ref/mcccodes](https://global.alipay.com/docs/ac/ref/mcccodes)

### DuitNow Limitations

1. Can't use our own registered DuitNow ID like mobile number, NRIC, etc. Unlike PayNow(SG) & PromptPay(TH)

2. Can't use the same account ID in static generated QR code into a dynamic generated QR code with a specified amount

### Credits

[https://github.com/natsu90/duitnowqr-test](https://github.com/natsu90/duitnowqr-test)
[https://gist.github.com/chengkiang/7e1c4899768245570cc49c7d23bc394c](https://gist.github.com/chengkiang/7e1c4899768245570cc49c7d23bc394c)

### License

Licensed under the [MIT license](http://opensource.org/licenses/MIT)
