#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
if [ ! -x .venv/bin/python ]; then uv venv --python 3.12 .venv; fi
UV_CACHE_DIR="$PWD/.uv-cache" uv pip sync --python .venv/bin/python requirements.txt
mkdir -p models out
for asset in kokoro-v1.0.onnx voices-v1.0.bin; do
  if [ ! -f "models/$asset" ]; then
    curl -fL --retry 2 "https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.1/$asset" -o "models/$asset"
  fi
done
(cd models && sha256sum -c ../SHA256SUMS)
