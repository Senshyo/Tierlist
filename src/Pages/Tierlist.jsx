import React, { useRef } from "react";
import "./Tierlist.css"

export default function Tierlist(){
    const divRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)]

    const getLabelTier = (i) => {
        const label = ["S", "A", "B", "C", "D", "E","F"]
        return label[i] || "Invalido"
    }

    const delImg = (id) => {
        const div = document.getElementById(id)
        const parent = div.parentNode
        if(parent){
            parent.removeChild(div)
        }
    }

    const handleExcluirTodas = () => {
        divRefs.forEach((ref) => {
            while (ref.current.childElementCount > 1) {
                ref.current.removeChild(ref.current.lastChild);
            }
        });
    }

    const handlePaste = (e,ref) => {
        const items = (e.clipboardData || e.originalEvent.clipboardData).items

        for(let i = 0; i < items.length; i++){
            const item = items[i]

            if(item.type.indexOf("image") !== -1){
                const blob = item.getAsFile()
                
                const reader = new FileReader()

                reader.onload = (e) => {
                    console.log(e)
                    const imgUrl = e.target.result
                    const imgId = Date.now()

                    const div = document.createElement("div")
                    div.classList.add("imgContainer")
                    div.id = imgId
                    div.addEventListener("dragstart", (e) => handleDragsStart(e,imgId))

                    const img = document.createElement("img")
                    img.src= imgUrl

                    const button = document.createElement("button")
                    button.textContent = "x"
                    button.addEventListener("click",() => delImg(imgId))

                    div.appendChild(img)
                    div.appendChild(button)

                    ref.current.appendChild(div)
                }
                
                reader.readAsDataURL(blob)
            }
        }
    }

    const handleDragsStart = (e,imgId) => {
        e.dataTransfer.setData("plain/text", imgId)   
    }
    const handleDragOver = (e) => {
        e.preventDefault()
    }
    const handleDrop = (e,ref) => {
        const imgId = e.dataTransfer.getData("plain/text")
        const div = document.getElementById(imgId)

        ref.current.appendChild(div)
    }
    return(
        <div className="Main">
            <div className="App">
                <h2>Tierlist</h2>
                <div>
                    <button onClick={handleExcluirTodas}>Excluir Todos</button>
                </div>
                {divRefs.map((ref,index) => <div className="Tier" key={index} onPaste={(e) => handlePaste(e,ref)} ref={ref} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e,ref)}>
                    <span className="Label">{getLabelTier(index)}</span>
                </div> )}
            </div>
        </div>
    )
}