// TODO: write code here
import { mdConvert } from 'md-converter';

console.log('app.js bundled');

const fileContainer = document.querySelector('.file-container');
/*const fileInput = fileContainer.querySelector('.overlapped');

const previewTitle = document.querySelector('.preview-title');
const previewText = document.querySelector('.preview-text');
const previewHtml = document.querySelector('.preview-html');
const previewImage = document.querySelector('.preview-image');*/

/*fileContainer.addEventListener('click', (e) => {
    console.log(e);
    
    console.log('click');

    fileInput.dispatchEvent(new MouseEvent('click'));
});

fileContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
})

fileContainer.addEventListener('drop', (e) => {
    e.preventDefault();

    console.log('drop')

    previewImage.src = URL.createObjectURL(e.dataTransfer.files && e.dataTransfer.files[0])
})

const displayImageContent = (e) => {
    console.log(e);

    previewImage.src = e.target.result;
}

const displayTextContent = (e) => {
    console.log(e);

    previewText.textContent = e.target.result;
}

const displayMDTextContent = (e) => {
    console.log(e);

    previewHtml.innerHTML = mdConvert(e.target.result);
}

fileInput.addEventListener('change', (e) => {
    console.log(e);
    console.dir(fileInput)

    const file = fileInput.files && fileInput.files[0];

    if(!file) return;

    previewTitle.textContent = file.name;

    const url = URL.createObjectURL(file);

    const link = document.createElement('a');

    link.href = url;
    link.rel = 'noopener';
    link.download = file.name;

    link.click();

    console.log(url)
})*/

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const items = document.querySelectorAll('.items');
  const itemsElements = body.querySelectorAll('.items-item');
  const bts = body.querySelectorAll(".bt")
  const deleteIcons = body.querySelectorAll('.delete-icon')

  let actualElement;

  bts.forEach(bt => {
    bt.addEventListener("click", (e) => {
      const li = document.createElement('li');
      const button = document.createElement("button")

      li.classList.add("items-item")
      li.textContent = 'Новый пункт списка';
      e.target.parentNode.insertBefore(li, e.target.parentNode.children[e.target.parentNode.children.length - 1]);

      button.classList.add("delete-icon");
      button.textContent = '×';
      li.appendChild(button)

      button.addEventListener("click", (e) => {
        e.target.parentNode.remove();
      })

    })
  });

  deleteIcons.forEach(deleteIcon => {
    deleteIcon.addEventListener("click", (e) => {
      e.target.parentNode.remove();
    })
  });



 

  const onMouseUp = (e) => {
    
      const mouseUpItem = e.target;

      itemsElements.forEach(element => {
        element.classList.remove('margin-bottom')
        element.style.marginBottom = '0px';
      });

      /*items.insertBefore(actualElement, mouseUpItem);*/
      if (e.target.tagName === 'UL') {
        /*e.target.appendChild(actualElement);*/
        
        e.target.insertBefore(actualElement, e.target.children[e.target.children.length - 1]);
      }
      if (e.target.tagName === 'LI') {
        /*e.target.appendChild(actualElement);*/
        e.target.parentNode.insertBefore(actualElement, e.target.parentNode.children[e.target.children.length + 1]);
      }
      

      actualElement.classList.remove('dragged');
      actualElement = undefined;

      document.documentElement.removeEventListener('mouseup', onMouseUp);
      document.documentElement.removeEventListener('mouseover', onMouseOver);
  };

  body.addEventListener('mousedown', (e) => {
      e.preventDefault();
      /*const rect = e.target.getBoundingClientRect();
      let elementHeight = rect.height
      console.log(elementHeight)*/

      
      if (e.target.tagName == 'LI') {
        actualElement = e.target;
      
        actualElement.classList.add('dragged');

        document.documentElement.addEventListener('mouseup', onMouseUp);
        document.documentElement.addEventListener('mouseover', onMouseOver);

        
      }
      
  })

  const onMouseOver = (e) => {
    /*e.preventDefault();*/
    if (e.target.tagName === "LI") {
      /*if (e.target.classList.contains("margin-bottom")) {
        console.log('rem')
        e.target.classList.remove('margin-bottom')
      } else {
        e.target.classList.add('margin-bottom')
        info = e.target
      }*/
      const rect = e.relatedTarget.getBoundingClientRect();
      let elementHeight = rect.height
      /*console.log(elementHeight)*/

      itemsElements.forEach(element => {
        /*element.classList.remove('margin-bottom')*/
        element.style.marginBottom = '0px';
        e.target.classList.remove('margin-bottom');
      });
      /*e.target.classList.add('margin-bottom')*/
      if (!e.target.classList.contains("margin-bottom")) {
        e.target.style.marginBottom = elementHeight / 8 + 'px';
        console.log(e.target.style.marginBottom)
        e.target.classList.add('margin-bottom')
      } 
    }

    const rect = actualElement.getBoundingClientRect();
    const offsetX = rect.width / 2;
    const offsetY = rect.height / 2;

    actualElement.style.top = (e.clientY - offsetY) + "px";
    actualElement.style.left = (e.clientX - offsetX) + "px";
};

})
