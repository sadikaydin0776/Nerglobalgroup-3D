import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Zorunlu alanlar eksik.' }, { status: 400 });
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    return NextResponse.json(
      { error: 'Form servisi henüz yapılandırılmamış.' },
      { status: 500 }
    );
  }

  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `NEW GLOBAL GROUP — Yeni İletişim Talebi: ${name}`,
      from_name: name,
      email,
      phone: phone || '—',
      message,
      botcheck: '',
    }),
  });

  const data = await res.json();

  if (data.success) {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: 'Mesaj gönderilemedi.' }, { status: 500 });
}
