## ➕ Adding or ➖ Removing a Language

To add or remove a language, follow these steps:

---

1. Open the file:

   `
   context/languageContext.jsx
   `

   and update the following line to include or remove the desired language:

   ```js
   const translations = { en, ru };
   ```

---

2. Create a `.json` file with translations inside the directory:

   `
   /context/langs
   `

---

   Then import that file in `context/languageContext.jsx`.

3. Add a button for the new language inside:
   `
   /components/language.jsx
   `

---

This will enable the new language in your project.

---

## Translation of static texts

To translate static text using the `useLanguage` hook, follow these steps:

---

### 1. Import the `useLanguage` hook

In the component where you need translation, import the hook:

```js
import { useLanguage } from "@/context/languageContext";
```

---

### 2. Destructure the `translate` function from the hook

Create a constant and extract the `translate` function from the hook:

```js
const { translate } = useLanguage();
```

---

### 3. Use the `translate` function instead of static text

Replace static text with a call to `translate()` like so:

```jsx
{translate("variable")}
```

---

### 4. Add the translation to your language JSON files

In your translation files (e.g. `context/en.json`), add the key and translated value:

```json
// context/en.json
{
  "variable": "Translated text in English"
}
```

Repeat the same in other language files (e.g. `ru.json`, `uz.json`) with the corresponding translations.

---


## 🌐 Sending `Accept-Language` in API Requests

To automatically send the current language in the `Accept-Language` header of your API requests, follow these steps:

---

### 1. Import the `useLanguage` hook

At the top of your custom hook or component where you configure your API, import:

```js
import { useLanguage } from "@/context/languageContext";
```

---

### 2. Get the current language from the hook

Inside your hook or component, extract the current language:

```js
const { language } = useLanguage();
```

---

### 3. Pass the language to request headers

Use `axios.create` (wrapped in `useMemo`) to pass the language as a header:

```js
import axios from "axios";
import { useMemo } from "react";

const address = "https://api.muizi.uz/api/";

const useApi = () => {
  const { language } = useLanguage();

  const api = useMemo(() => {
    return axios.create({
      baseURL: address,
      headers: {
        "Accept-Language": language,
      },
    });
  }, [language]);

  return api;
};

export default useApi;
```

---

### 4. Pass language to your query key (if using React Query)

When using a query (e.g. `useQuery`), include the current language in the `queryKey`, so the query refetches on language change:

```js
const { language } = useLanguage();

const { data } = useQuery(['projects', language], () => 
  api.get('/projects').then(res => res.data)
);
```

This ensures the data is re-fetched with the correct `Accept-Language` when the language changes.

---