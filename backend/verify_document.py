# backend/verify_document.py

import pytesseract
from PIL import Image
import sys

def verify_document(image_path):
    # Load the image from file
    img = Image.open(image_path)
    
    # Extract text using Tesseract
    extracted_text = pytesseract.image_to_string(img)
    
    # Example check for Aadhaar card or similar documents
    if "Aadhaar" in extracted_text:
        return "Document is valid"
    else:
        return "Document is invalid"

if __name__ == "__main__":
    image_path = sys.argv[1]
    result = verify_document(image_path)
    print(result)
