# 🔍 Thai Bad Words Detection Library

<div align="right">
  <a href="README.md">English</a> | <a href="README.th.md">ภาษาไทย</a>
</div>

## 📖 Overview

A powerful TypeScript library for detecting inappropriate Thai words in text content. Perfect for content moderation, chat filters and other.

## ✨ Key Features

- 🎯 Smart detection combining prefixes and root words
- 🚫 Customizable ignore list for false positives
- 🔄 Dynamic updates to word lists
- 🛠️ Easy to integrate and configure

## 📦 Installation

Choose your preferred package manager:

```bash
# Using npm
npm install @sit-sandbox/thai-bad-words

# Using yarn
yarn add @sit-sandbox/thai-bad-words
```

## 🛠️ API Reference

### Core Functions

#### 🔍 `checkBadWords(input: string): void`

```typescript
// Throws an error if bad words are found
checkBadWords("some text");
```

#### ➕ `addBadWords(newBadWords: string[]): void`

```typescript
addBadWords(["word1", "word2"]);
```

#### 🚫 `addIgnoreList(newIgnoreWords: string[]): void`

```typescript
addIgnoreList(["false_positive1", "false_positive2"]);
```

#### ➕ `addPrefixes(newPrefixes: string[]): void`

```typescript
addPrefixes(["prefix1", "prefix2"]);
```

#### ❌ `removeBadWords(wordsToRemove: string[]): void`

```typescript
removeBadWords(["word1"]);
```

#### 📋 `getBadWords(): string[]`

```typescript
const badWords = getBadWords();
```

## 🌟 Usage Example

```typescript
import { checkBadWords, addBadWords, addIgnoreList } from "thai-bad-words";

// Add words to ignore
addIgnoreList(["หีบ", "สัสดี"]);

// Add new bad words
addBadWords(["โง่", "บ้า"]);

// Check text
try {
  checkBadWords("some text to check");
} catch (error) {
  console.log("❌ Bad word detected:", error.message);
}
```

## 📝 Default Configuration

### 🔤 Prefixes

Common prefixes used for word combinations:

```typescript
["กู", "มึง", "ไอ้", "อี", "ไอ", "ผม", "คุณ", "กระผม", "เธอ", "พ่อ", "แม่", "นาย"];
```

### 🚫 Ignore List

Words that should be skipped during detection:

```typescript
["หีบ", "สัสดี", "หน้าหีบ", "ตด"];
```

### 📋 Root Words

Base inappropriate words (shortened for README):

```typescript
["ควย", "เหี้ย", "หี", "สัส", "เชี่ย" /* ... and more ... */];
```

## 🤝 Contributing

Contributions are welcome! Feel free to:

- 🐛 Report bugs
- 💡 Suggest new features
- 📝 Improve documentation
- 🔧 Submit pull requests

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💬 Support

If you have any questions or need support, please:

- 📫 Open an issue
- 🌟 Star the repository if you find it helpful
