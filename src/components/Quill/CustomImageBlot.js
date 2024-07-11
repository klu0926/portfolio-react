import Quill from 'quill';

const Embed = Quill.import('blots/embed');

class CustomImageBlot extends Embed {
  static create(url) {
    const node = super.create();
    node.setAttribute('src', url);
    node.setAttribute('class', 'quill-image resize-drag');
    return node;
  }

  static formats(node) {
    let format = {};
    if (node.hasAttribute('height')) {
      format.height = node.getAttribute('height');
    }
    if (node.hasAttribute('width')) {
      format.width = node.getAttribute('width');
    }
    if (node.hasAttribute('invert')) {
      format.invert = node.getAttribute('invert');
    }
    return format;
  }

  format(name, value) {
    let isFormatted = false
    if (name === 'height' || name === 'width') {
      isFormatted = true
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    }

    if (name === 'invert') {
      isFormatted = true
      if (value) {
        this.domNode.style.filter = 'invert(1)';
        this.domNode.setAttribute('invert', 'true');
      } else {
        this.domNode.style.filter = '';
        this.domNode.removeAttribute('invert');
      }
    }

    if (!isFormatted) {
      super.format(name, value);
    }
  }
}

CustomImageBlot.blotName = 'customImage'; // Use when inserting the blot
CustomImageBlot.tagName = 'img'; // Tag name of the DOM node

// Example of registering the blot with Quill (adjust as needed)
Quill.register({
  'formats/image': CustomImageBlot,
}, true);

export { CustomImageBlot };
