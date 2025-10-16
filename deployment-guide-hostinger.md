# دليل رفع مشروع Belloo على Hostinger

## نظرة عامة
هذا المشروع هو تطبيق Next.js مع الميزات التالية:
- قاعدة بيانات SQLite
- نظام رفع الملفات (CVs)
- إرسال الإيميلات عبر Gmail
- لوحة تحكم إدارية
- دعم تعدد اللغات (عربي، إنجليزي، روسي)

## متطلبات Hostinger
- Hostinger Business Plan أو أعلى (يدعم Node.js)
- Node.js 18+ 
- صلاحية SSH access

## خطوات الرفع

### 1. إعداد المشروع محلياً

```bash
# تأكد من أن جميع التبعيات مثبتة
npm install

# إنشاء build للإنتاج
npm run build

# إنشاء ملف ZIP للرفع
# احذف node_modules أولاً لتوفير المساحة
rm -rf node_modules
```

### 2. رفع الملفات على Hostinger

1. **عبر File Manager:**
   - ادخل إلى cPanel الخاص بك في Hostinger
   - افتح File Manager
   - اذهب إلى مجلد public_html
   - احذف جميع الملفات الموجودة (index.html وغيرها)
   - ارفع ملف ZIP الخاص بمشروعك
   - فك الضغط عن الملف

2. **عبر SSH (الطريقة المفضلة):**
   ```bash
   # اتصل بخادم Hostinger عبر SSH
   ssh username@your-domain.com
   
   # اذهب إلى مجلد الموقع
   cd public_html
   
   # احذف الملفات القديمة
   rm -rf *
   
   # ارفع مشروعك (يمكنك استخدام git أو scp)
   ```

### 3. إعداد Node.js على Hostinger

1. من cPanel، اذهب إلى "Node.js Apps"
2. اضغط "Create Application"
3. اختر Node.js version 18+
4. Application Root: `/public_html`
5. Application URL: اختر domain أو subdomain
6. Application Startup File: `server.js` (سننشئه)

### 4. إنشاء ملف الخادم (server.js)

```javascript
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = process.env.PORT || 3000

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  })
  .once('error', (err) => {
    console.error(err)
    process.exit(1)
  })
  .listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})
```

### 5. إعداد متغيرات البيئة

1. انسخ ملف `.env.production` إلى `.env`
2. غيّر المتغيرات حسب بيئة الإنتاج:
   ```
   NODE_ENV=production
   JWT_SECRET=ضع-مفتاح-قوي-وعشوائي-هنا
   GMAIL_USER=your-email@gmail.com
   GMAIL_PASS=your-app-password
   ```

### 6. تثبيت التبعيات

```bash
# عبر SSH أو Terminal في Hostinger
cd /public_html
npm install --production
```

### 7. إعداد قاعدة البيانات

```bash
# تأكد من أن ملف قاعدة البيانات موجود ولديه الصلاحيات المناسبة
chmod 666 belloo.db
chmod 777 uploads/
chmod 777 uploads/cvs/
```

### 8. تشغيل التطبيق

1. من Node.js Apps في cPanel
2. اضغط على التطبيق الذي أنشأته
3. اضغط "Start App"

### 9. إعداد النطاق (Domain)

إذا كنت تريد استخدام النطاق الرئيسي:
1. من cPanel، اذهب إلى "Subdomains"
2. أو استخدم "Redirects" لتوجيه النطاق الرئيسي إلى التطبيق

## نصائح مهمة

### الأمان
- غيّر `JWT_SECRET` إلى قيمة قوية وعشوائية
- تأكد من أن ملف `.env` غير مرئي للعامة
- استخدم HTTPS دائماً

### الأداء
- تأكد من تفعيل cache في Hostinger
- استخدم CDN إذا أمكن
- قم بضغط الصور قبل الرفع

### الصيانة
- اعمل backup دوري لقاعدة البيانات
- راقب logs الخادم للأخطاء
- حدّث التبعيات بانتظام

## استكشاف الأخطاء

### مشاكل شائعة:

1. **التطبيق لا يعمل:**
   - تحقق من logs في Node.js Apps
   - تأكد من أن server.js موجود
   - تحقق من متغيرات البيئة

2. **قاعدة البيانات لا تعمل:**
   - تحقق من صلاحيات الملف
   - تأكد من أن المسار صحيح

3. **رفع الملفات لا يعمل:**
   - تحقق من صلاحيات مجلد uploads
   - تأكد من أن المجلد موجود

4. **الإيميلات لا ترسل:**
   - تحقق من إعدادات Gmail
   - تأكد من App Password صحيح

## روابط مفيدة
- [Hostinger Node.js Documentation](https://support.hostinger.com/en/articles/4394042-how-to-deploy-a-node-js-application-to-hostinger)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)

## الدعم
إذا واجهت أي مشاكل، تحقق من:
1. Logs في cPanel
2. متغيرات البيئة
3. صلاحيات الملفات
4. إعدادات Node.js App
