export default {
    async fetch(request) {
        const url = new URL(request.url);

        // Route handling based on the URL path
        if (request.method === 'POST' && url.pathname === '/generate-otp') {
            return await generateOTP(request);
        } else if (request.method === 'POST' && url.pathname === '/validate-otp') {
            return await validateOTP(request);
        } else {
            return new Response('Not Found', { status: 404 });
        }
    }
}

// Utility function to generate a 6-digit OTP
function generateRandomOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// In-memory store for OTPs (for demo purposes, you can use Cloudflare KV storage for production)
const otpStore = new Map();

/**
 * Function to generate an OTP and send it via email
 */
async function generateOTP(request) {
    const { email } = await request.json();
    if (!email) {
        return new Response(JSON.stringify({ error: 'Email is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // Generate a new OTP
    const otp = generateRandomOTP();
    const expiresAt = Date.now() + 5 * 60 * 1000; // OTP expires in 5 minutes

    // Store the OTP in memory (use Cloudflare KV for persistence)
    otpStore.set(email, { otp, expiresAt });

    // Send OTP via email (using a hypothetical sendEmail function)
    await sendEmail(email, otp);

    return new Response(JSON.stringify({ message: 'OTP sent' }), {
        headers: { 'Content-Type': 'application/json' }
    });
}

/**
 * Function to validate the OTP
 */
async function validateOTP(request) {
    const { email, otp } = await request.json();
    if (!email || !otp) {
        return new Response(JSON.stringify({ error: 'Email and OTP are required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // Check if OTP exists and is valid
    const storedOtpData = otpStore.get(email);
    if (storedOtpData && storedOtpData.otp === otp && storedOtpData.expiresAt > Date.now()) {
        otpStore.delete(email); // Invalidate OTP after successful validation
        return new Response(JSON.stringify({ message: 'OTP validated' }), {
            headers: { 'Content-Type': 'application/json' }
        });
    } else {
        return new Response(JSON.stringify({ error: 'Invalid or expired OTP' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

/**
 * Function to send an email (using a third-party email API)
 */
async function sendEmail(email, otp) {
    const apiKey = '<YOUR_SENDGRID_API_KEY>'; // Replace with your SendGrid API key
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            personalizations: [{ to: [{ email }] }],
            from: { email: 'your_email@example.com' },
            subject: 'Your OTP Code',
            content: [{ type: 'text/plain', value: `Your OTP is: ${otp}` }]
        })
    });

    if (!response.ok) {
        console.error('Failed to send email');
        throw new Error('Email sending failed');
    }
}
