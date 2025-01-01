# מדריך ליצירת אפליקציה להורדת סרטונים ואודיו מיוטיוב

## מטרת הפרויקט

הפרויקט מיועד להוריד סרטונים ואודיו מאתר יוטיוב בצורה נוחה ואוטומטית. המשתמש יכול לבחור להוריד את הסרטון או רק את האודיו, בנוסף יש אפשרות להוריד כתוביות לפי בחירת השפה.

## דרישות

לפני שתתחיל להשתמש בפרויקט, יש לוודא שהתקנת את הכלים הבאים:

- **Python 3.11 ומעלה** – ניתן להוריד את גרסת פייתון הרשמית [מכאן](https://www.python.org/downloads/).
- **yt-dlp** – כלי להורדת סרטונים מאתרים שונים, כולל יוטיוב.
- **FFmpeg** – כלי להמרת אודיו ווידאו. ניתן להוריד מ-[כאן](https://ffmpeg.org/download.html).
- **PyInstaller** – ספריה להפיכת קוד Python לאפליקציה נפרדת שניתן להריץ במערכות שונות.

## התקנת דרישות

1. התקן את Python על המחשב אם עדיין לא עשית זאת.
2. התקן את yt-dlp על ידי הרצת הפקודה:

bash
   pip install -U yt-dlp

התקן את FFmpeg על המחשב שלך.

התקן את PyInstaller:

bash

pip install pyinstaller

לפי השם של האפליקציה שלך הרץ:

bash

pyinstaller --onefile app.py

בתיקייה dist:

יהיה אפליקציה ניידת מוכנה