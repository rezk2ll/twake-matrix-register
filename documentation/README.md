# API Endpoint Documentation:


### Description
This API endpoint allows users to check if the provided OTP (One-Time Password) is valid. It requires the user's password in the request body and a valid session cookie for authentication.

### Endpoint URL
/api/check-otp

### HTTP Method
POST

### Request Parameters

#### Request Body
The request body should be in JSON format and include the following property:

| Parameter  | Type   | Description                            |
|------------|--------|----------------------------------------|
| password   | string | The user's password for verification.  |

Example:
```json
{
  "password": "1234"
}
