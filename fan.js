  
const fs = require('fs');



const config = {
  paths: [
    {
      path: "/datas",
      toEncrypt: [
        {
          // Path to the element to be encrypted in the request JSON body
          element: "path.to.foo",
          // Path to the object where to store encryption fields in the request JSON body
          obj: "path.to.encryptedFoo",
        },
      ],
      toDecrypt: [
        {
          // Path to the element where to store decrypted fields in the response object
          element: "path.to.encryptedFoo",
          // Path to the object with encryption fields
          obj: "path.to.foo",
        },
      ],
    },
  ],
  mode: "JWE",
  encryptedValueFieldName: "encryptedData",
  encryptionCertificate: "./certificate.pem",  // Ensure this path is correct too
  privateKey: "./rsa__key.pem",  // The private key is correctly loaded
  
};
console.log('privateKey',config.privateKey);

const payload = {
  path: {
    to: {
      foo: {
        sensitive: "this is a secret!",
        // sensitive2: "this is a super-secret!",
      },
    },
  },
};

const header = {
  // Add any headers needed for encryption (optional)
};

// Create an instance of JweEncryption
const jwe = new (require("mastercard-client-encryption").JweEncryption)(config);

// Encrypt the payload
let encryptedRequestPayload = jwe.encrypt("/datas", header, payload);

console.log(encryptedRequestPayload);
