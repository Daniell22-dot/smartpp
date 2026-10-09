import nodemailer from "nodemailer";

export const sendEmail = async (
  email: string,
  subject: string,
  message: string,
  html?: string
): Promise<boolean> => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"GM BUSINESS SERVICES" <${process.env.EMAIL_USER}>`,
      to: email,
      subject,
      text: message,
      html: html || message,
    };

    const info = await transporter.sendMail(mailOptions);

    if (!info.accepted || info.accepted.length === 0) {
      throw new Error("Email not accepted by SMTP server");
    }

    return true;
  } catch (error: any) {
    throw new Error("Failed to send email: " + error.message);
  }
};

/**
 * Sends an abandoned cart recovery email to a customer.
 * @param email - customer email address
 * @param name - customer name (for personalization)
 * @param cartItems - summary of items in the cart
 * @param total - cart total amount
 * @param recoverLink - URL to resume the cart (e.g. /cart?recoverOrderId=<id>
 */
export const sendAbandonedCartEmail = async (
  email: string,
  name: string,
  cartItems: Array<{ name: string; price: string; quantity: number }>,
  total: number,
  recoverLink: string
): Promise<boolean> => {
  const itemLines = cartItems
    .map(
      (item) =>
        `- ${item.name} (KSh ${item.price}) x ${item.quantity}`
    )
    .join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Your cart is waiting for you</h2>
      <p>Hello ${name},</p>
      <p>We noticed you left items in your cart. Complete your purchase within the next 24 hours and enjoy 10% off your order!</p>
      <ul>
        ${itemLines}
      </ul>
      <p><strong>Total: KSh ${total.toLocaleString()}</strong></p>
      <div style="margin: 30px 0;">
        <a href="${recoverLink}" style="background: #25d366; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
          Resume Cart
        </a>
      </div>
      <p>If you have any questions, reply to this email or contact us at support@gmbusinesssolutions.com.</p>
      <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />
      <p style="font-size: 12px; color: #777;">
        GM Business Solutions • If you didn't leave items in your cart, you can ignore this email.<br />
        <a href="mailto:support@gmbusinesssolutions.com">support@gmbusinesssolutions.com</a>
      </p>
    </div>
  `

  const text = `
    Your cart is waiting for you

    Hello ${name},

    We noticed you left items in your cart. Complete your purchase within the next 24 hours and enjoy 10% off your order!

    Items:
    ${itemLines}

    Total: KSh ${total.toLocaleString()}

    Resume Cart: ${recoverLink}

    If you have any questions, reply to this email or contact us at support@gmbusinesssolutions.com.

    GM Business Solutions • If you didn't leave items in your cart, you can ignore this email.
    support@gmbusinesssolutions.com
  `

  return sendEmail(email, "Your cart is waiting for you", text, html)
}