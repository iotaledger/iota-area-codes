# iota-area-code
IOTA area code converter


# Sample code for the library usage

```
async function test() {
  const iac = await addressToIac('Bizetstrasse 136, 13088 Berlin')
  const address = await iacToAddress('NPHTRPFM9FF')
  console.log(iac, address)
}

test()
```

# REST

- GET /iac?address=Strassburger+Str.+55,+10405+Berlin,+Germany

- GET /address?iac=NPHTRPFM9FF
