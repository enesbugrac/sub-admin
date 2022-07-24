let draggables = document.querySelectorAll(".container-item");
let containers = document.querySelectorAll(".container-in");
let draggableFormElement = document.querySelectorAll(".form-elements-item");
let draggingItem;
draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggingItem = draggable;
  });
  draggable.addEventListener("dragend", () => {});
});
draggableFormElement.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    let currentId = draggable.id;
    let gettingContainer = currentId.replace("element", "item");
    draggable = document.querySelector(`#${gettingContainer}`).cloneNode(true);
    let newId = gettingContainer + draggables[0].parentNode.childElementCount;
    console.log(newId);
    draggingItem = draggable;
    draggingItem.setAttribute("id", newId);
    draggables = document.querySelectorAll(".container-item");
    containers = document.querySelectorAll(".container-in");
    draggables.forEach((draggablee) => {
      draggablee.addEventListener("dragstart", () => {
        draggingItem = draggablee;
        console.log(draggablee.id);
      });
      draggablee.addEventListener("dragend", () => {
        draggables = document.querySelectorAll(".container-item");
        containers = document.querySelectorAll(".container-in");
      });
    });
  });
  draggable.addEventListener("dragend", () => {
    draggables = document.querySelectorAll(".container-item");
    containers = document.querySelectorAll(".container-in");
  });
});

containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(container, e.clientY);

    if (afterElement == null) {
      container.appendChild(draggingItem);
      draggables = document.querySelectorAll(".container-item");
      containers = document.querySelectorAll(".container-in");
      draggables.forEach((draggablee) => {
        draggablee.addEventListener("dragstart", () => {
          draggingItem = draggablee;
          console.log(draggablee.id);
        });
        draggablee.addEventListener("dragend", () => {
          draggables = document.querySelectorAll(".container-item");
          containers = document.querySelectorAll(".container-in");
        });
      });
    } else {
      container.insertBefore(draggingItem, afterElement);
      draggables = document.querySelectorAll(".container-item");
      containers = document.querySelectorAll(".container-in");
      draggables.forEach((draggablee) => {
        draggablee.addEventListener("dragstart", () => {
          draggingItem = draggablee;
          console.log(draggablee.id);
        });
        draggablee.addEventListener("dragend", () => {
          draggables = document.querySelectorAll(".container-item");
          containers = document.querySelectorAll(".container-in");
        });
      });
    }
  });
});

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(
      ".container-item:not(.container-item-dragging)"
    ),
  ];
  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
