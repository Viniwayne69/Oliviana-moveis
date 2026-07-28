# Configuração do Firebase

Este projeto foi preparado para usar Firebase no lugar de Supabase.

## Serviços recomendados

- Firebase Authentication para proteger `/admin`
- Cloud Firestore para imóveis, contatos, perguntas frequentes, depoimentos e configurações
- Firebase Storage para imagens dos imóveis

## Coleções sugeridas

- `properties`
- `propertyImages`
- `leads`
- `testimonials`
- `faq`
- `siteSettings`
- `admins`

## Regras iniciais de Firestore

```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function signedIn() {
      return request.auth != null;
    }

    function isAdmin() {
      return signedIn() &&
        exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }

    match /properties/{propertyId} {
      allow read: if resource.data.published == true || isAdmin();
      allow write: if isAdmin();
    }

    match /leads/{leadId} {
      allow create: if true;
      allow read, update, delete: if isAdmin();
    }

    match /faq/{faqId} {
      allow read: if resource.data.published == true || isAdmin();
      allow write: if isAdmin();
    }

    match /testimonials/{testimonialId} {
      allow read: if resource.data.published == true || isAdmin();
      allow write: if isAdmin();
    }

    match /siteSettings/{settingId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    match /admins/{adminId} {
      allow read, write: if isAdmin();
    }
  }
}
```

## Regras iniciais de Storage

```txt
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /properties/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```
