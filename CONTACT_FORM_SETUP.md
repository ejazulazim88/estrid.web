# Contact Form Setup Guide

The contact form on the Estrid Band website uses **Web3Forms** to send form submissions to `estridband.official@gmail.com`. This guide will help you set up the form to make it functional.

## Why Web3Forms?

- ✅ **Free** - No cost for basic usage
- ✅ **No Backend Required** - Perfect for static GitHub Pages deployment
- ✅ **Easy Setup** - Just need an access key
- ✅ **Spam Protection** - Built-in spam filtering
- ✅ **Email Notifications** - Sends submissions directly to your email
- ✅ **No Rate Limits** - Unlimited submissions on free plan

## Setup Instructions

### Step 1: Get Your Web3Forms Access Key

1. Visit [https://web3forms.com](https://web3forms.com)
2. Enter your email address: `estridband.official@gmail.com`
3. Click "Get Access Key"
4. Check your email inbox for a verification email from Web3Forms
5. Click the verification link in the email
6. Copy your access key from the Web3Forms dashboard

### Step 2: Configure Environment Variables

#### For Local Development:

1. Create a `.env.local` file in the project root (if it doesn't exist):
   ```bash
   cp .env.local.example .env.local
   ```

2. Open `.env.local` and add your Web3Forms access key:
   ```env
   NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_actual_access_key_here
   NEXT_PUBLIC_BASE_PATH=/estrid.web
   ```

3. Save the file

#### For GitHub Pages Deployment:

1. Go to your GitHub repository settings
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the following secret:
   - **Name**: `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`
   - **Value**: Your Web3Forms access key
5. Click **Add secret**

### Step 3: Update GitHub Actions Workflow

Make sure your `.github/workflows/deploy.yml` includes the environment variable:

```yaml
- name: Build
  run: npm run build
  env:
    NEXT_PUBLIC_BASE_PATH: /${{ github.event.repository.name }}
    NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY: ${{ secrets.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY }}
```

### Step 4: Test the Form

#### Local Testing:

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to the Contact section
3. Fill out the form with test data
4. Click "Hantar" (Send)
5. You should see a success message: "Mesej berjaya dihantar! Kami akan menghubungi anda tidak lama lagi."
6. Check your email (`estridband.official@gmail.com`) for the form submission

#### Production Testing:

1. Push your changes to GitHub
2. Wait for the GitHub Actions deployment to complete
3. Visit your live site: `https://ejazulazim88.github.io/estrid.web/`
4. Navigate to the Contact section
5. Submit a test form
6. Verify the email is received

## Form Features

### User Experience:

- ✅ **Loading State**: Button shows "Menghantar..." while submitting
- ✅ **Success Message**: Green success message after successful submission
- ✅ **Error Handling**: Red error message if submission fails
- ✅ **Form Reset**: Form clears automatically after successful submission
- ✅ **Disabled State**: Submit button is disabled during submission
- ✅ **Visual Feedback**: Pulsing send icon during submission

### Email Format:

When a user submits the form, you'll receive an email with:
- **From**: Web3Forms (on behalf of the user)
- **Reply-To**: User's email address
- **Subject**: "Mesej Hubungi dari [User's Name]"
- **Body**: User's message
- **Metadata**: User's name and email

## Troubleshooting

### Form Not Sending:

1. **Check Access Key**: Verify your Web3Forms access key is correct
2. **Check Environment Variable**: Ensure `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` is set
3. **Check Email Verification**: Make sure you verified your email with Web3Forms
4. **Check Browser Console**: Look for error messages in the browser console
5. **Check Network Tab**: Verify the API request is being sent to `https://api.web3forms.com/submit`

### Not Receiving Emails:

1. **Check Spam Folder**: Web3Forms emails might be in spam
2. **Check Email Address**: Verify `estridband.official@gmail.com` is correct
3. **Check Web3Forms Dashboard**: Log in to see if submissions are being received
4. **Whitelist Web3Forms**: Add `noreply@web3forms.com` to your contacts

### Error Messages:

- **"Maaf, terdapat masalah menghantar mesej. Sila cuba lagi."**
  - Network error or invalid access key
  - Check your internet connection
  - Verify the access key is correct

## Alternative: Mailto Fallback

If you prefer not to use Web3Forms, you can implement a simple mailto fallback:

```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  
  const subject = encodeURIComponent(`Mesej Hubungi dari ${formData.name}`);
  const body = encodeURIComponent(
    `Nama: ${formData.name}\nEmail: ${formData.email}\n\nMesej:\n${formData.message}`
  );
  
  window.location.href = `mailto:estridband.official@gmail.com?subject=${subject}&body=${body}`;
};
```

**Note**: This opens the user's default email client, which may not be configured on all devices.

## Support

- **Web3Forms Documentation**: [https://docs.web3forms.com](https://docs.web3forms.com)
- **Web3Forms Support**: [https://web3forms.com/support](https://web3forms.com/support)

## Security Notes

- ✅ Access key is safe to expose in client-side code (it's prefixed with `NEXT_PUBLIC_`)
- ✅ Web3Forms has built-in spam protection
- ✅ Rate limiting is handled by Web3Forms
- ✅ No sensitive data is stored in the repository

