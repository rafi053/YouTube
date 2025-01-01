import yt_dlp
import os

def download_video(url):
    print(f"Starting download from URL: {url}")
    
    ydl_opts = {
        'format': 'bestvideo+bestaudio/best',
        'outtmpl': os.path.join(os.getcwd(), '%(title)s.%(ext)s'),
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])
        print("Download completed successfully!")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    while True:
        url = input("Enter a YouTube link for a video or playlist (or type 'e' to exit): ")
        if url.lower() == 'e':
            print("Exiting program.")
            break
        download_video(url)
