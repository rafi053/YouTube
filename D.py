import yt_dlp
import os

def download_video(url, choice, subtitle_choice=None):
    print(f"Starting download from URL: {url}")
    ydl_opts = {
        'outtmpl': os.path.join(os.getcwd(), '%(title)s.%(ext)s'),
    }
    if choice == '1':
        ydl_opts.update({
            'format': 'bestvideo+bestaudio/best',
            'merge_output_format': 'mp4',
        })
    elif choice == '2':
        ydl_opts.update({
            'format': 'bestaudio/best',
            'postprocessors': [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'mp3',
                'preferredquality': '192',
            }],
        })
    if subtitle_choice:
        subtitle_languages = ['en'] if subtitle_choice == '1' else ['he']
        ydl_opts.update({
            'writesubtitles': True,
            'writeautomaticsub': True,
            'subtitleslangs': subtitle_languages,
            'subtitlesformat': 'vtt',
        })
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])
        print("Download completed successfully!")
    except Exception as e:
        print(f"An error occurred: {e}")

def choose_subtitle_languages():
    print("1. English")
    print("2. Hebrew")
    choice = input("Enter your choice (1/2): ").strip()
    if choice in ['1', '2']:
        return choice
    else:
        print("Invalid choice.")
        return None

def main():
    while True:
        url = input("Enter a YouTube link for a video or playlist (or type 'e' to exit): ").strip()
        if url.lower() == 'e':
            print("Exiting program.")
            break
        
        print("1. Video + Audio (Highest Quality)")
        print("2. Audio Only")
        choice = input("Enter your choice (1/2): ").strip()
        
        if choice == '1':
            download_video(url, '1')
            print("1. Download subtitles")
            print("2. Skip subtitles")
            download_subtitles = input("Enter your choice (1/2): ").strip()
            if download_subtitles == '1':
                subtitle_choice = choose_subtitle_languages()
                if subtitle_choice:
                    download_video(url, '1', subtitle_choice)
        elif choice == '2':
            download_video(url, '2')
        else:
            print("Invalid choice.")

if __name__ == "__main__":
   main()
