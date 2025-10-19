const sendEmail = async (to, subject, html) => {
  console.log('📧 Email Notification:');
  console.log('   To:', to);
  console.log('   Subject:', subject);
  console.log('   ✅ Email logged (SendGrid not configured)');
  return { success: true };
};

module.exports = { sendEmail };