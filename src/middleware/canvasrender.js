const Rx = require('rx');

class CanvasRender {
  constructor(element, stream) {
    this.element = element;
    this.stream = stream;
    this.objects = null;

    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');

    window.addEventListener('resize', () => {
      this.resize();
      this.render();
    });
    this.resize();

    this.element.appendChild(this.canvas);

    stream.subscribe(
      objects => {
        this.objects = objects;
        this.render();
      }
    );
  }

  resize() {
    this.canvas.width = this.element.clientWidth;
    this.canvas.height = this.element.clientHeight;
  }

  renderTransform() {
    this.context.resetTransform();
    const size = Math.min(this.canvas.width, this.canvas.height);
    // this.context.scale(this.canvas.width / 100, this.canvas.height / 100);
    // this.context.translate((this.canvas.width - size) / 2, (this.canvas.height - size) / 2);
    this.context.setTransform(
      size / 100, 0,
      0, size / 100,
      (this.canvas.width - size) / 2, (this.canvas.height - size) / 2
    );
  }

  render() {
    this.context.resetTransform();
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.renderTransform();
    // this.context.fillRect(0, 0, 100, 100);

    if (this.objects != null) {
      this.objects.forEach(object => this.renderObject(object));
    }
  }

  renderObject(object) {
    const size = 10;
    this.context.fillStyle = object.color;
    this.context.fillRect(
      object.x - size / 2,
      object.y - size / 2,
      size,
      size
    );
  }
}

module.exports = CanvasRender;
