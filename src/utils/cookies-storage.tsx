export function setCookie(
   name: string,
   value: string,
   options?: { seconds?: number; secure?: boolean; sameSite?: 'Strict' | 'Lax' | 'None' },
) {
   let cookieStr = `${name}=${encodeURIComponent(value)}`;

   if (options?.seconds) {
      const date = new Date();
      date.setTime(date.getTime() + options.seconds * 1000);
      cookieStr += `; expires=${date.toUTCString()}`;
   }

   cookieStr += `; path=/`;

   if (options?.secure) cookieStr += `; secure`;
   if (options?.sameSite) cookieStr += `; samesite=${options.sameSite}`;

   document.cookie = cookieStr;
}

export function getCookie(name: string): string | null {
   const nameEQ = name + '=';
   const ca = document.cookie.split(';');
   for (let c of ca) {
      c = c.trim();
      if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length));
   }
   return null;
}

export function eraseCookie(name: string) {
   document.cookie = `${name}=; Max-Age=-99999999; path=/`;
}
