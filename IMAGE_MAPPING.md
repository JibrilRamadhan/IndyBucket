# Image Mapping - Indy Bucket Real Products

## 📸 **REAL PRODUCT IMAGES**

All placeholder images have been replaced with actual product photos from `/public/img/`

---

## 🗂️ **IMAGE INVENTORY**

### Available Images (14 total)
```
1. 518246805_17937698430022939_3520854924251823578_n.jpg (Logo)
2. Blackpink bouquet🖤💗.webp (Pink & Black Roses)
3. Buket buah 🍇🍊.heic (Fruit Bucket)
4. Buket Bulan Unik🌙.heic (Moon Bucket)
5. Buket kupu (uang + rokok) 🍫💝.webp (Butterfly Money + Cigarette)
6. Buket perhiasan (cincin+gelang) 🍫💝.webp (Jewelry Bucket)
7. Buket Pita Satin💓.heic (Satin Ribbon Bucket)
8. Buket snack 🍫💝.webp (Snack Bucket)
9. Buket uang & cokelat🍫💝.webp (Money & Chocolate)
10. Buket uang 🍫💝.webp (Money Bucket 1)
11. Buket Uang 💸✨.webp (Money Bucket 2)
12. Buket uang💝.webp (Money Bucket 3)
13. Cute butterfly bouquet😍🦋.webp (Butterfly Bouquet)
14. Gold and blue peacock bouquet🦚💫.webp (Peacock Bouquet)
```

---

## 🎯 **COMPONENT IMAGE MAPPING**

### **Hero Section**
```typescript
Large Image (Right):
  /img/Buket uang & cokelat🍫💝.webp
  → Money & Chocolate bucket

Small Image (Left):
  /img/Gold and blue peacock bouquet🦚💫.webp
  → Gold & Blue Peacock bouquet
```

**Why These:**
- Large image: Shows money + chocolate combo (popular product)
- Small image: Elegant peacock design (premium look)

---

### **Discover Section** (4 Products)

#### Product 1: Premium Roses
```
Image: /img/Blackpink bouquet🖤💗.webp
Description: Pink & Black roses arrangement
Badge: New
Price: From $85.00
```

#### Product 2: Luxury Money Buckets
```
Image: /img/Buket uang 🍫💝.webp
Description: Money bucket with chocolate
Badge: None
Price: From $150.00
```

#### Product 3: Gourmet Snack Boxes
```
Image: /img/Buket snack 🍫💝.webp
Description: Snack bucket arrangement
Badge: Limited
Price: From $75.00
```

#### Product 4: Eternal Dried Flowers
```
Image: /img/Cute butterfly bouquet😍🦋.webp
Description: Butterfly themed bouquet
Badge: None
Price: From $65.00
```

---

### **Fresh Blooms Section** (3 Categories)

#### Category 1: Money Buckets
```
Image: /img/Buket Uang 💸✨.webp
Description: Money bucket with sparkle theme
Position: Left
```

#### Category 2: Flower Buckets
```
Image: /img/Gold and blue peacock bouquet🦚💫.webp
Description: Premium peacock design
Position: Center (offset up)
```

#### Category 3: Snack Buckets
```
Image: /img/Buket snack 🍫💝.webp
Description: Gourmet snack collection
Position: Right
```

---

### **Best Sellers Section** (4 Products)

#### Product 1: Classic Money Presentation
```
Image: /img/Buket uang💝.webp
Description: Classic money bucket
Price: $110
```

#### Product 2: Luxury Rose Bucket
```
Image: /img/Blackpink bouquet🖤💗.webp
Description: Pink & Black roses
Price: $135
```

#### Product 3: Premium Gift Bucket
```
Image: /img/Buket perhiasan (cincin+gelang) 🍫💝.webp
Description: Jewelry bucket (ring + bracelet)
Price: $150
```

#### Product 4: Deluxe Snack Collection
```
Image: /img/Buket snack 🍫💝.webp
Description: Premium snack arrangement
Price: $125
```

---

### **About Us Page**

#### Our Story Image
```
Image: /img/Buket kupu (uang + rokok) 🍫💝.webp
Description: Butterfly bucket with money & cigarette
Position: Right side of story section
```

**Why This:**
- Shows craftsmanship and detail
- Unique butterfly design
- Demonstrates customization capability

---

## 📊 **IMAGE USAGE STATISTICS**

### Most Used Images
1. **Buket snack 🍫💝.webp** - Used 3 times
   - Discover Section
   - Fresh Blooms Section
   - Best Sellers Section

2. **Blackpink bouquet🖤💗.webp** - Used 2 times
   - Discover Section
   - Best Sellers Section

3. **Gold and blue peacock bouquet🦚💫.webp** - Used 2 times
   - Hero Section
   - Fresh Blooms Section

### Unique Images (Used Once)
- Buket uang & cokelat🍫💝.webp (Hero)
- Buket uang 🍫💝.webp (Discover)
- Cute butterfly bouquet😍🦋.webp (Discover)
- Buket Uang 💸✨.webp (Fresh Blooms)
- Buket uang💝.webp (Best Sellers)
- Buket perhiasan.webp (Best Sellers)
- Buket kupu.webp (About Us)

### Unused Images (Available for Future)
- 518246805_17937698430022939_3520854924251823578_n.jpg (Logo - used in Navbar)
- Buket buah 🍇🍊.heic (Fruit bucket)
- Buket Bulan Unik🌙.heic (Moon bucket)
- Buket Pita Satin💓.heic (Satin ribbon)

---

## 🎨 **IMAGE SELECTION STRATEGY**

### Criteria for Selection
1. **Visual Appeal** - Eye-catching, professional photos
2. **Product Variety** - Show different bucket types
3. **Quality** - Clear, well-lit images
4. **Relevance** - Match product category names

### Distribution Strategy
- **Hero:** Most impressive products (money + peacock)
- **Discover:** Variety showcase (roses, money, snack, butterfly)
- **Fresh Blooms:** Category representatives
- **Best Sellers:** Popular/premium items
- **About Us:** Unique craftsmanship example

---

## 🔧 **TECHNICAL NOTES**

### Image Paths
All images use relative paths from `/public/`:
```typescript
src="/img/filename.webp"
```

### File Formats
- **.webp** - Modern, optimized format (most images)
- **.heic** - Apple format (3 images - may need conversion)
- **.jpg** - Standard format (logo)

### HEIC Files Warning
⚠️ **HEIC files may not display in all browsers**

Files that need conversion:
1. Buket buah 🍇🍊.heic
2. Buket Bulan Unik🌙.heic
3. Buket Pita Satin💓.heic

**Recommendation:** Convert to .webp or .jpg for better compatibility

---

## 📱 **RESPONSIVE BEHAVIOR**

All images use:
```css
className="w-full h-full object-cover"
```

**Benefits:**
- ✅ Fills container completely
- ✅ Maintains aspect ratio
- ✅ Crops to fit (no distortion)
- ✅ Responsive on all devices

---

## 🚀 **PERFORMANCE**

### Image Loading
- Images loaded from `/public/img/`
- Vite automatically optimizes during build
- Browser caching enabled
- Lazy loading via AOS animations

### Optimization Tips
1. ✅ Use WebP format (already done for most)
2. ⚠️ Convert HEIC to WebP
3. 💡 Consider image compression
4. 💡 Add loading="lazy" attribute

---

## 📝 **FUTURE IMPROVEMENTS**

### Recommended Actions
1. **Convert HEIC files** to WebP for compatibility
2. **Optimize file sizes** (compress without quality loss)
3. **Rename files** to simpler names (optional)
4. **Add more variety** for unused categories
5. **Create thumbnails** for faster loading

### Naming Convention Suggestion
```
Current: Buket uang & cokelat🍫💝.webp
Better:  money-chocolate-bucket.webp

Benefits:
- Easier to reference in code
- Better for SEO
- No emoji/special characters
- Shorter file paths
```

---

## ✅ **VERIFICATION CHECKLIST**

- [x] All placeholder images replaced
- [x] Hero section updated
- [x] Discover section updated (4 products)
- [x] Fresh Blooms updated (3 categories)
- [x] Best Sellers updated (4 products)
- [x] About Us updated
- [x] Build successful
- [x] No broken image links
- [ ] HEIC files converted (recommended)
- [ ] Images optimized (recommended)

---

**Status:** ✅ All Real Product Images Integrated  
**Build:** ✅ Production Ready  
**Images:** 11 of 14 used (3 HEIC files available for future)
