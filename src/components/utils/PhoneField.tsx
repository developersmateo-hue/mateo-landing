// components/PhoneField.tsx
import React, { useMemo, useState, useId } from 'react';
import { AsYouType, parsePhoneNumberFromString } from 'libphonenumber-js';

type Country = {
  code: string;      // ISO-2 (US, BR, MX, ES, PR...)
  dial: string;      // +1, +55, etc.
  maxNationalDigits: number;
};

const COUNTRIES: Country[] = [
  { code: 'US', dial: '+1',  maxNationalDigits: 10 }, // Estados Unidos
  { code: 'PR', dial: '+1',  maxNationalDigits: 10 }, // Puerto Rico
  { code: 'BR', dial: '+55', maxNationalDigits: 11 }, // Brasil
  { code: 'MX', dial: '+52', maxNationalDigits: 10 }, // México
  { code: 'ES', dial: '+34', maxNationalDigits: 9  }, // España

  // Caribe
  { code: 'CU', dial: '+53', maxNationalDigits: 8  }, // Cuba
  { code: 'DO', dial: '+1',  maxNationalDigits: 10 }, // República Dominicana
  { code: 'HT', dial: '+509', maxNationalDigits: 8 }, // Haití
  { code: 'JM', dial: '+1',  maxNationalDigits: 10 }, // Jamaica

  // Centroamérica
  { code: 'PA', dial: '+507', maxNationalDigits: 8 }, // Panamá
  { code: 'CR', dial: '+506', maxNationalDigits: 8 }, // Costa Rica
  { code: 'GT', dial: '+502', maxNationalDigits: 8 }, // Guatemala
  { code: 'HN', dial: '+504', maxNationalDigits: 8 }, // Honduras
  { code: 'SV', dial: '+503', maxNationalDigits: 8 }, // El Salvador
  { code: 'NI', dial: '+505', maxNationalDigits: 8 }, // Nicaragua

  // Sudamérica
  { code: 'CO', dial: '+57', maxNationalDigits: 10 }, // Colombia
  { code: 'VE', dial: '+58', maxNationalDigits: 10 }, // Venezuela
  { code: 'PE', dial: '+51', maxNationalDigits: 9  }, // Perú
  { code: 'CL', dial: '+56', maxNationalDigits: 9  }, // Chile
  { code: 'AR', dial: '+54', maxNationalDigits: 10 }, // Argentina
  { code: 'EC', dial: '+593', maxNationalDigits: 9  }, // Ecuador
  { code: 'BO', dial: '+591', maxNationalDigits: 8  }, // Bolivia
  { code: 'PY', dial: '+595', maxNationalDigits: 9  }, // Paraguay
  { code: 'UY', dial: '+598', maxNationalDigits: 8  }, // Uruguay
];


function countryCodeToFlag(iso2: string) {
  return iso2
    .toUpperCase()
    .replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));
}

export interface PhoneFieldValue {
  e164: string;      // +15551234567
  national: string;  // 5551234567 (solo dígitos)
  country: string;   // US, BR...
  dial: string;      // +1
  isValid: boolean;
}

interface PhoneFieldProps {
  name?: string;
  defaultCountryCode?: string; // 'US'
  label?: string;
  required?: boolean;
  onChange?: (value: PhoneFieldValue) => void;
}

const PhoneField: React.FC<PhoneFieldProps> = ({
  name = 'phone',
  defaultCountryCode = 'US',
  label = 'WhatsApp / Teléfono',
  required = true,
  onChange
}) => {
  const inputId = useId();
  const [countryCode, setCountryCode] = useState<string>(defaultCountryCode);
  const country = useMemo(
    () => COUNTRIES.find(c => c.code === countryCode) ?? COUNTRIES[0],
    [countryCode]
  );

  // mostramos SOLO el número nacional formateado (sin +código)
  const [nationalDigits, setNationalDigits] = useState<string>(''); // solo dígitos
  const [displayValue, setDisplayValue] = useState<string>('');      // formateado nacional
  const [error, setError] = useState<string>('');

  function clampToMaxDigits(n: string) {
    return n.slice(0, country.maxNationalDigits);
  }

  function toE164(n: string) {
    const raw = `${country.dial}${n}`;
    const parsed = parsePhoneNumberFromString(raw);
    return parsed?.number || raw;
  }

  function isValidE164(e164: string) {
    const p = parsePhoneNumberFromString(e164);
    return p?.isValid() ?? false;
  }

  function formatNational(n: string) {
    // importante: NO pasamos el dial para que no lo muestre
    const typer = new AsYouType(country.code as any);
    return typer.input(n);
  }

  function emit(n: string) {
    const e164 = toE164(n);
    const valid = isValidE164(e164);
    onChange?.({
      e164,
      national: n,
      country: country.code,
      dial: country.dial,
      isValid: valid,
    });
    setError(valid || !n ? '' : 'Número no válido para el país seleccionado.');
  }

  function handleInputChange(val: string) {
    // solo dígitos (si pegan con símbolos/espacios, se limpian)
    let n = val.replace(/\D/g, '');
    n = clampToMaxDigits(n);
    setNationalDigits(n);
    setDisplayValue(formatNational(n));
    emit(n);
  }

  function handleCountryChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value;
    setCountryCode(next);
    // re-formatear lo ya escrito con el nuevo país
    const nextCountry = COUNTRIES.find(c => c.code === next)!;
    const n = nationalDigits.slice(0, nextCountry.maxNationalDigits);
    setNationalDigits(n);
    setDisplayValue(
      new AsYouType(next as any).input(n)
    );
    const e164 = (parsePhoneNumberFromString(`${nextCountry.dial}${n}`)?.number)
      || `${nextCountry.dial}${n}`;
    const valid = parsePhoneNumberFromString(e164)?.isValid() ?? false;
    setError(valid || !n ? '' : 'Número no válido para el país seleccionado.');
    onChange?.({
      e164,
      national: n,
      country: nextCountry.code,
      dial: nextCountry.dial,
      isValid: valid,
    });
  }

  function handleBlur() {
    // limpieza final por si hay espacios invisibles
    handleInputChange(displayValue);
  }

  return (
    <div className="relative">
      <label htmlFor={inputId} className="block text-sm font-medium text-white/80 mb-2">
        {label}{required && ' *'}
      </label>

      <div className="flex gap-2 items-stretch">
        {/* Select: solo bandera + código */}
        <div className="relative w-28">
          <select
  aria-label="Código de país"
  value={countryCode}
  onChange={handleCountryChange}
  className="
    w-full bg-white/10 border border-white/20 rounded-lg px-2 py-3 text-white
    focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8
    appearance-none
    [background-image:none] [-webkit-appearance:none] [-moz-appearance:none]
    bg-transparent
  "
>
            {COUNTRIES.map(c => (
    <option key={c.code} value={c.code}>
      {countryCodeToFlag(c.code)} {c.dial}
    </option>
  ))}
</select>
          
        </div>

        {/* Prefijo visual con el dial (no editable) */}
        <div className="hidden sm:flex items-center px-3 bg-white/10 border border-white/20 rounded-lg text-white/80">
          {country.dial}
        </div>

        {/* Input solo número nacional */}
        <div className="relative flex-1">
          <input
            id={inputId}
            name={name}
            required={required}
            inputMode="tel"
            autoComplete="tel"
            placeholder="número"
            value={displayValue}
            onChange={(e) => handleInputChange(e.target.value)}
            onBlur={handleBlur}
            className={`w-full bg-white/10 border rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2
              ${error ? 'border-red-400 focus:ring-red-500' : 'border-white/20 focus:ring-blue-500'}`}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
          />
        </div>
      </div>

      {error && (
        <p id={`${inputId}-error`} className="mt-2 text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  );
};

export default PhoneField;
