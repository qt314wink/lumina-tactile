import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const files: string[] = [];

  for (let i = 0; i < 4; i++) {
    const file = form.get(`ear${i}`) as File | null;
    if (!file) continue;
    const buffer = Buffer.from(await file.arrayBuffer());
    const filePath = path.join('/tmp', `ear-${i}-${Date.now()}.jpg`);
    await writeFile(filePath, buffer);
    files.push(filePath);
  }

  if (files.length === 0) {
    return NextResponse.json({ error: 'No ear photos provided' }, { status: 400 });
  }

  const inputArgs = files.map((f) => `--ear ${f}`).join(' ');
  const outputSofa = `/tmp/personalized-${Date.now()}.sofa`;
  const command = `python3 -m hrtf_personalize ${inputArgs} --output ${outputSofa}`;

  return new Promise((resolve) => {
    exec(command, (error) => {
      if (error) return resolve(NextResponse.json({ error: 'HRTF personalization failed' }, { status: 500 }));
      const sofaUrl = `/hrtf/personalized-${Date.now()}.sofa`;
      resolve(NextResponse.json({ success: true, sofaUrl }));
    });
  });
}
