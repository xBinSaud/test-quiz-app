# Quiz Application

A test quiz application that uses Firebase for backend and Cloudinary for image storage.

## Features
- User authentication
- Create and manage quizzes
- Upload images for questions
- Real-time updates

## Technologies
- Firebase
- Cloudinary
- JavaScript
- HTML/CSS

## Automation with n8n
This project includes n8n workflows for automating various tasks:

### Cloudinary Image Upload Workflow
Located in `workflows/cloudinary_upload.json`, this workflow handles:
- Image uploads to Cloudinary
- Success/error handling
- Storing image URLs

### Quiz Data Synchronization Workflow
Located in `workflows/quiz_data_sync.json`, this workflow handles:
- Scheduled fetching of quiz data
- Data processing
- Error logging

## How to use n8n workflows
1. Import the workflow JSON files into your n8n instance
2. Replace placeholder values (like CLOUD_NAME and UPLOAD_PRESET) with your actual credentials
3. Activate the workflows

Note: You may need to adjust the workflows based on your n8n version.