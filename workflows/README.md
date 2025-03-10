# n8n Workflows for Quiz Application

This directory contains automation workflows for the Quiz Application using n8n.

## Available Workflows

### 1. Cloudinary Image Upload (`cloudinary_upload.json`)

This workflow handles the image upload process to Cloudinary:

- **Trigger**: Manual (can be triggered when an image is selected in the app)
- **Input**: Expects `imageData` (base64 encoded image or URL)
- **Process**: 
  - Uploads the image to Cloudinary
  - Checks if upload was successful
  - Returns formatted response with image URL
- **Output**: JSON with status, imageUrl, and publicId

#### Configuration Requirements:
- Replace `CLOUD_NAME` with your Cloudinary cloud name
- Replace `UPLOAD_PRESET` with your Cloudinary upload preset

### 2. Quiz Data Synchronization (`quiz_data_sync.json`)

This workflow handles scheduled quiz data retrieval and processing:

- **Trigger**: Schedule (runs hourly)
- **Process**:
  - Fetches quiz data from API
  - Validates the response
  - Processes successful responses or logs errors
- **Output**: Processed quiz data or error logs

#### Configuration Requirements:
- Update the API URL to your actual quiz data endpoint
- Adjust the schedule as needed

## Importing Workflows into n8n

1. In your n8n instance, go to **Workflows**
2. Click **Import from File**
3. Select the workflow JSON file
4. Review the imported workflow and make any necessary adjustments
5. Save the workflow

## Common Issues and Solutions

### "connections[key2].forEach is not a function" Error

If you encounter this error when importing:

1. Open the JSON file in a text editor
2. Check if the `connections` structure matches your n8n version
3. For newer n8n versions, the connections structure should look like:
   ```json
   "connections": {
     "NodeName": {
       "main": [
         [
           {
             "node": "TargetNodeName",
             "type": "main",
             "index": 0
           }
         ]
       ]
     }
   }
   ```

### Authentication Issues

If the workflows fail due to authentication:

1. Check that you've replaced all placeholder values with actual credentials
2. Verify API keys and tokens are valid
3. Check if the Cloudinary upload preset has the correct permissions

## Using Workflows with the Quiz App

These workflows are designed to be integrated with the Quiz Application. To connect them:

1. Set up webhooks in n8n for the appropriate triggers
2. Update the application code to call these webhooks
3. Ensure proper error handling in both the app and workflows