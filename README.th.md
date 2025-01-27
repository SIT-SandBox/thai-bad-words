# 🔍 ไลบรารีตรวจจับคำหยาบภาษาไทย

<div align="right">
  <a href="README.md">English</a> | <a href="README.th.md">ภาษาไทย</a>
</div>

## 📖 ภาพรวม

ไลบรารี TypeScript ที่ทรงประสิทธิภาพสำหรับการตรวจจับคำไม่เหมาะสมในภาษาไทย เหมาะสำหรับการตรวจสอบเนื้อหา, ระบบแชท และอื่นๆ

## ✨ คุณสมบัติเด่น

- 🎯 ตรวจจับอัจฉริยะด้วยการรวมคำนำหน้าและคำหลัก
- 🚫 รายการยกเว้นที่ปรับแต่งได้
- 🔄 อัพเดทรายการคำแบบไดนามิก
- 🛠️ ง่ายต่อการติดตั้งและปรับแต่ง

## 📦 การติดตั้ง

เลือกตัวจัดการแพ็คเกจที่คุณต้องการ:

```bash
# ใช้ npm
npm install @sit-sandbox/thai-bad-words

# ใช้ yarn
yarn add @sit-sandbox/thai-bad-words
```

## 🛠️ API อ้างอิง

### ฟังก์ชันหลัก

#### 🔍 `scanBadWords(input: Record<string,any>): void`

```typescript
// จะ throw error ถ้าพบคำไม่เหมาะสม
scanBadWords("ข้อความ");
scanBadWords(["ข้อความ"]);
scanBadWords({"key":"ข้อความ"});
scanBadWords({
  "level1": {
    "key1": "ข้อความ",
    "key2": {
      "level2": [
        {
          "keyA": "ข้อความ",
          "keyB": {
            "level3": [
              {
                "keyX": "ข้อความ",
                "keyY": {
                  "level4": [
                    {
                      "key1": "ข้อความ",
                      "key2": [
                        {
                          "keyZ": "ข้อความ",
                          "level5": {
                            "keyM": "ข้อความ",
                            "level6": [
                              {
                                "keyP": "ข้อความ",
                                "level7": [
                                  "ข้อความ",
                                  "ข้อความ",
                                  "ข้อความ"
                                ....
)
```

#### ➕ `addBadWords(newBadWords: string[]): void`

```typescript
addBadWords(["คำ1", "คำ2"]);
```

#### 🚫 `addIgnoreList(newIgnoreWords: string[]): void`

```typescript
addIgnoreList(["คำยกเว้น1", "คำยกเว้น2"]);
```

#### ➕ `addPrefixes(newPrefixes: string[]): void`

```typescript
addPrefixes(["คำนำหน้า1", "คำนำหน้า2"]);
```

#### ❌ `removeBadWords(wordsToRemove: string[]): void`

```typescript
removeBadWords(["คำที่ต้องการลบ"]);
```

#### 📋 `getBadWords(): string[]`

```typescript
const badWords = getBadWords();
```

## 🌟 ตัวอย่างการใช้งาน

```typescript
import { scanBadWords, addBadWords, addIgnoreList } from "@sit-sandbox/thai-bad-words";

// เพิ่มคำที่ต้องการยกเว้น
addIgnoreList(["หีบ", "สัสดี"]);

// เพิ่มคำไม่เหมาะสม
addBadWords(["โง่", "บ้า"]);

// ตรวจสอบข้อความ
try {
  scanBadWords("ข้อความที่ต้องการตรวจสอบ");
} catch (error) {
  console.log("❌ พบคำไม่เหมาะสม:", error.message);
}
```

## 📝 การตั้งค่าเริ่มต้น

### 🔤 คำนำหน้า

คำนำหน้าที่ใช้ในการรวมคำ:

```typescript
["กู", "มึง", "ไอ้", "อี", "ไอ", "ผม", "คุณ", "กระผม", "เธอ", "พ่อ", "แม่", "นาย"];
```

### 🚫 รายการยกเว้น

คำที่จะข้ามการตรวจสอบ:

```typescript
["หีบ", "สัสดี", "หน้าหีบ", "ตด"];
```

### 📋 คำหลัก

คำไม่เหมาะสมพื้นฐาน (ย่อเพื่อแสดงในคู่มือ):

```typescript
["ควย", "เหี้ย", "หี", "สัส", "เชี่ย" /* ... และอื่นๆ ... */];
```

## 🤝 การมีส่วนร่วม

ยินดีต้อนรับการมีส่วนร่วมจากทุกท่าน:

- 🐛 รายงานข้อผิดพลาด
- 💡 แนะนำฟีเจอร์ใหม่
- 📝 ปรับปรุงเอกสาร
- 🔧 ส่ง Pull Requests

## 📄 ลิขสิทธิ์

โปรเจคนี้อยู่ภายใต้ MIT License - ดูรายละเอียดเพิ่มเติมได้ในไฟล์ LICENSE

## 💬 การสนับสนุน

หากคุณมีคำถามหรือต้องการความช่วยเหลือ:

- 📫 เปิด Issue
- 🌟 ให้ดาวโปรเจคถ้าคุณพบว่ามีประโยชน์
