const verificationTemplate = (verificationToken) => {
    return `
    <div>
        <h1> To verify your email click to link below</h1>
        <a href="http://localhost:3000/api/users/verify/${verificationToken}" target="_blank" 
        style="border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box; 
        cursor: pointer; display: inline-block; font-size: 14px; font-weight: bold; margin: 0; 
        padding: 12px 25px; text-decoration: none; text-transform: capitalize; 
        background-color: #3498db; border-color: #3498db; color: #ffffff;">Click</a>
    </div>
    `
}
const resendVerificationTemplate = (verificationToken) => {
    return `
    <div>
        <h1> We sent verification link again. Click to link below</h1>
        <a href="http://localhost:3000/api/users/verify/${verificationToken}" target="_blank" 
        style="border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box; 
        cursor: pointer; display: inline-block; font-size: 14px; font-weight: bold; margin: 0; 
        padding: 12px 25px; text-decoration: none; text-transform: capitalize; 
        background-color: #3498db; border-color: #3498db; color: #ffffff;">Click</a>
    </div>
    `
}
module.exports = {
    verificationTemplate, resendVerificationTemplate
}