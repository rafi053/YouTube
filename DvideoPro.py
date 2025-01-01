import yt_dlp
import os


def download_content(url, choice, subtitle_choice=None):
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
        print("1. Enter a YouTube link for a video or playlist")
        print("2. Close the program")
        action = input("Enter your choice (1/2): ").strip()
        if action == '1':
            url = input("Enter the URL: ").strip()
            print("1. Video")
            print("2. Audio")
            choice = input("Enter your choice (1/2): ").strip()
            if choice not in ['1', '2']:
                print("Invalid choice.")
                continue
            if choice == '1':
                download_content(url, choice)
                print("1. Download subtitles")
                print("2. Skip subtitles")
                download_subtitles = input("Enter your choice (1/2): ").strip()
                if download_subtitles == '1':
                    subtitle_choice = choose_subtitle_languages()
                    if subtitle_choice:
                        download_content(url, choice, subtitle_choice)
            elif choice == '2':
                download_content(url, choice)
        elif action == '2':
            print("Exiting program.")
            break
        else:
            print("Invalid choice.")


if __name__ == "__main__":
    main()
