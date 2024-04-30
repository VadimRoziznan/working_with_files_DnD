document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const itemsElements = body.querySelectorAll(".items-item");
  const bts = body.querySelectorAll(".bt");
  const deleteIcons = body.querySelectorAll(".delete-icon");
  let height;
  let offsetX, offsetY;

  let actualElement;

  bts.forEach((bt) => {
    bt.addEventListener("click", (e) => {
      const li = document.createElement("li");
      const button = document.createElement("button");

      li.classList.add("items-item");
      li.textContent = "Новый пункт списка";
      // eslint-disable-next-line
      e.target.parentNode.insertBefore(li, e.target.parentNode.children[e.target.parentNode.children.length - 1]);

      button.classList.add("delete-icon");
      button.textContent = "×";
      li.appendChild(button);

      button.addEventListener("click", (e) => {
        e.target.parentNode.remove();
      });
    });
  });

  deleteIcons.forEach((deleteIcon) => {
    deleteIcon.addEventListener("click", (e) => {
      e.target.parentNode.remove();
    });
  });

  const onMouseUp = (e) => {
    itemsElements.forEach((element) => {
      element.classList.remove("margin-bottom");
      element.style.marginBottom = "0px";
    });
    if (e.target.tagName === "UL") {
      // eslint-disable-next-line
      e.target.insertBefore(actualElement, e.target.children[e.target.children.length - 1]);
    }
    if (e.target.tagName === "LI") {
      // eslint-disable-next-line
      e.target.parentNode.insertBefore(actualElement, e.target.parentNode.children[e.target.children.length + 1]);
    }

    actualElement.classList.remove("dragged");
    actualElement = undefined;

    document.documentElement.removeEventListener("mouseup", onMouseUp);
    document.documentElement.removeEventListener("mouseover", onMouseOver);
  };

  body.addEventListener("mousedown", (e) => {
    e.preventDefault();

    if (e.target.tagName == "LI") {
      actualElement = e.target;

      height = e.target.clientHeight;

      offsetX = e.clientX - actualElement.getBoundingClientRect().left;
      offsetY = e.clientY - actualElement.getBoundingClientRect().top;

      let rect = actualElement.getBoundingClientRect();
      let initialX = rect.left + window.scrollX;
      let initialY = rect.top + window.scrollY;

      actualElement.style.left = initialX + "px";
      actualElement.style.top = initialY + "px";

      actualElement.classList.add("dragged");

      document.documentElement.addEventListener("mouseup", onMouseUp);
      document.documentElement.addEventListener("mouseover", onMouseOver);
    }
  });

  const onMouseOver = (e) => {
    e.preventDefault();
    if (e.target.tagName === "LI") {
      itemsElements.forEach((element) => {
        element.style.marginBottom = "0px";
        e.target.classList.remove("margin-bottom");
      });
      if (
        !e.target.classList.contains("margin-bottom") &&
        e.target.tagName === "LI"
      ) {
        e.target.style.marginBottom = height + "px";

        e.target.classList.add("margin-bottom");
      }
    }

    actualElement.style.top = e.clientY - offsetY + "px";
    actualElement.style.left = e.clientX - offsetX + "px";
  };
});
