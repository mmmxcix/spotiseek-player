// AudioWorklet: reicht das Mikrofonsignal (Mono) in Bloecken an die Seite weiter.
class Capture extends AudioWorkletProcessor {
  constructor() {
    super()
    this.buf = new Float32Array(2048)
    this.n = 0
  }
  process(inputs) {
    const ch = inputs[0]
    if (ch && ch.length) {
      const a = ch[0], b = ch[1]
      for (let i = 0; i < a.length; i++) {
        this.buf[this.n++] = b ? (a[i] + b[i]) / 2 : a[i]
        if (this.n === this.buf.length) {
          this.port.postMessage(this.buf, [this.buf.buffer])
          this.buf = new Float32Array(2048)
          this.n = 0
        }
      }
    }
    return true
  }
}
registerProcessor('capture', Capture)
