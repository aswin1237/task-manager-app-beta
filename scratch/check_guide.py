import re

with open(r'c:\Users\aswin\OneDrive\Desktop\uiux app\index.html', 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

checks = {
    "1.1 SOS alert() usage": 'alert("EMERGENCY BROADCAST' in content or 'alert(' in content,
    "1.2 SOS SMS geo intent": 'sms:' in content and 'body=' in content,
    "1.3 I Am Safe / Close split": 'I Am Safe' in content and 'Close Emergency Modal' in content,
    "2.1 landPass hardcoded value": bool(re.search(r'id=["\']landPass["\'][^>]*value=', content)),
    "2.2 WebCrypto SHA-256 (hashSecret)": 'crypto.subtle.digest' in content,
    "2.3 Role change authentication guard": 'checkRoleAuth' in content or 'verifyRolePin' in content,
    "3.1 CSV formula sanitization": 'csvCell' in content or "'=" in content,
    "3.2 escapeHTML in all template sinks": 'escapeHTML' in content or 'escHtml' in content,
    "4.1 Dynamic Home Finance Summary": 'financeSummary' in content,
    "4.2 Integer Paise currency math": 'amountPaise' in content,
    "5.1 localIso() implementation": 'function localIso' in content or 'const localIso' in content,
    "5.2 Stale hardcoded October dates": 'Oct 14' in content or 'Oct 26' in content,
    "6.1 Unified searchAll()": 'function searchAll' in content,
    "6.2 Web Notifications API": 'Notification.requestPermission' in content,
    "7.1 Fitness dynamic activityLog": 'activityLog' in content,
    "8.1 Isolated safeLoad() per key": 'safeLoad' in content,
    "8.2 IndexedDB for receipts": 'indexedDB.open' in content,
    "9.1 doseLog array for meds": 'doseLog' in content,
    "9.2 Sensor masking on privacy pause": 'data-sensor' in content,
    "10.1 Native <dialog id='confirmDlg'>": '<dialog' in content,
    "12.1 Interactive elements are <button>/<a>": bool(re.search(r'<div[^>]*onclick=["\']toggle', content)),
    "13.1 Monolithic single file vs split": len(content) > 500000
}

for k, v in checks.items():
    print(f"{k}: {v}")
