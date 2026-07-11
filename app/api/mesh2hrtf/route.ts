import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const meshFile = form.get('mesh') as File;
  const prompt = form.get('prompt') as string || '';

  const params = {
    frequencyRange: form.get('frequencyRange') || '20-20000',
    meshResolution: parseInt(form.get('meshResolution') as string) || 8000,
    absorption: parseFloat(form.get('absorption') as string) || 0.6,
    fastPreview: form.get('fastPreview') === 'true',
  };

  const buffer = Buffer.from(await meshFile.arrayBuffer());
  const meshPath = path.join('/tmp', `mesh-${Date.now()}.obj`);
  await writeFile(meshPath, buffer);

  let bemCommand = `python3 -m mesh2hrtf --input ${meshPath} --freq ${params.frequencyRange} --resolution ${params.meshResolution} --absorption ${params.absorption}`;
  if (prompt) {
    bemCommand += ` --prompt "${prompt}"`;
  }
  if (params.fastPreview) bemCommand += ' --fast-preview';

  return new Promise((resolve) => {
    exec(bemCommand, async (error, stdout) => {
      if (error) return resolve(NextResponse.json({ error: 'BEM solve failed' }, { status: 500 }));

      const sofaUrl = `/hrtf/generated-${Date.now()}.sofa`;
      resolve(NextResponse.json({
        success: true,
        sofaUrl,
        previewHRTF: params.fastPreview ? 'low-res GPU preview ready' : 'full fidelity',
        bemParamsUsed: params,
        translationNote: prompt ? `Prompt mapped: ${prompt}` : null
      }));
    });
  });
}
