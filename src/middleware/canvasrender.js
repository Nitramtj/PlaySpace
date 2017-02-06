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

  render() {
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, 100, 100);

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
