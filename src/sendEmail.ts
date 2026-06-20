const emailSender = (ms: number)=>{
    return new Promise((resolve)=>{
        setTimeout(() => {
            resolve("email sent");
        }, ms);
    })
}

const sendEmail = async (data: any)=>{
    console.log("Sending email to ", data.email);
    await emailSender(3000);
    console.log("Email sent to ", data.email);
}

export default sendEmail;