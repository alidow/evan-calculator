# Google Analytics Setup Guide

## Step 1: Create a Google Analytics 4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click on "Admin" (gear icon) in the bottom left
3. Click "Create Property"
4. Enter your property details:
   - Property name: "Algebraic Factoring Calculator"
   - Select your timezone and currency
5. Click "Next" and fill in business details
6. Click "Create" and accept the terms

## Step 2: Get Your Measurement ID

1. In your new property, go to Admin → Data Streams
2. Click "Add stream" → "Web"
3. Enter your website URL: `https://evan-calculator.vercel.app`
4. Enter stream name: "Main Website"
5. Click "Create stream"
6. Copy the Measurement ID (format: G-XXXXXXXXXX)

## Step 3: Add to Your Environment

1. Create a `.env.local` file in your project root:
```bash
cp .env.local.example .env.local
```

2. Edit `.env.local` and add your Measurement ID:
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-YOUR-ID-HERE
```

## Step 4: Deploy to Vercel

1. Add the environment variable in Vercel:
   - Go to your project in Vercel Dashboard
   - Settings → Environment Variables
   - Add: `NEXT_PUBLIC_GA_MEASUREMENT_ID` with your G-ID
   - Select all environments (Production, Preview, Development)

2. Redeploy your application

## What's Being Tracked

The following events are automatically tracked:

- **Expression Factoring**: Every time a user factors an expression
- **Example Selection**: When users click on example expressions
- **Educational Tab Views**: Which educational content tabs users view
- **Step-by-Step Views**: When users view step-by-step solutions
- **Dark Mode Toggle**: UI preference changes

## Viewing Your Analytics

1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your property
3. View real-time data in "Reports" → "Realtime"
4. View historical data in "Reports" → "Engagement" → "Events"

## Privacy Considerations

- Google Analytics respects user privacy settings
- Consider adding a cookie consent banner if required by law
- Update your privacy policy to mention analytics usage

## Testing

To test if GA is working:
1. Open your site in an incognito window
2. Open Google Analytics Realtime view
3. Perform actions on your site
4. You should see activity in realtime