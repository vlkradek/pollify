# Struktura projektu – Pollify

Tento dokument slouží jako průvodce zdrojovým kódem projektu Pollify. Cílem je usnadnit orientaci v repozitáři a vysvětlit, kde se nachází jednotlivé části aplikace a k čemu slouží.

## Hlavní složky projektu

### /app
Hlavní složka aplikace, která obsahuje všechny stránky i API cesty. Struktura složek odpovídá jednotlivým cestám aplikace. Každá stránka je reprezentována souborem `page.tsx`.

- `page.tsx`  
  Domovská stránka aplikace.

- `/polls`  
  Stránka se seznamem všech dostupných anket.

- `/polls/[id]`  
  Dynamická stránka pro zobrazení detailu konkrétní ankety podle jejího ID.

- `/login`  
  Stránka pro přihlášení uživatele pomocí Google účtu.

- `/account`  
  Uživatelský účet – správa vlastních anket, odhlášení a smazání účtu.

- `/account/create-poll`  
  Formulář pro vytvoření nové ankety (přístupný pouze přihlášeným uživatelům).

### /app/api
Obsahuje API cesty, které zajišťují komunikaci mezi frontendem a databází. Každá složka představuje jednu API cestu a obsahuje soubor `route.ts`.

- `/api/polls`  
  Vytváření nových anket (POST).

- `/api/polls/[id]`  
  Práce s konkrétní anketou – změna stavu ankety (PATCH) a její smazání (DELETE).

- `/api/polls/[id]/vote`  
  Odeslání hlasu uživatele do ankety.

- `/api/account/delete`  
  Smazání uživatelského účtu a souvisejících dat.

## /lib
Složka obsahující sdílenou logiku a pomocné soubory, které se používají napříč aplikací.

- `prisma.ts`  
  Inicializace Prisma klienta pro práci s databází.

- `/schemas`  
  Zod schémata pro validaci vstupních dat (např. data z API požadavků).

- další pomocné soubory a typy používané v aplikaci

## /prisma
Složka určená pro databázovou vrstvu.

- `schema.prisma`  
  Definice databázového schématu (uživatelé, ankety, možnosti, hlasy).

- `/migrations`  
  Databázové migrace vytvořené pomocí Prisma.

## /public
Obsahuje statické soubory, jako jsou obrázky nebo ikony používané v aplikaci.

## Konfigurační soubory

- `package.json`  
  Definice použitých knihoven

- `next.config.js`  
  Konfigurace frameworku.

- `tailwind.config.ts`  
  Nastavení stylování pomocí TailwindCSS.

- `.env` (není součástí repozitáře)  
  Proměnné prostředí, například přihlašovací údaje k databázi nebo Google OAuth.

## Poznámka ke čtení kódu

Projekt je strukturován tak, aby byla jasně oddělena:
- prezentační část (stránky v `/app`)
- serverová logika (API cesty v `/app/api`)
- databázová vrstva (`/prisma`)
- sdílená logika a validace (`/lib`)

Díky této struktuře je možné snadno sledovat tok dat od uživatelského rozhraní přes API až do databáze.
