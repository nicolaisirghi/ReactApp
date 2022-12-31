import React, {useState} from 'react'
// @ts-ignore
import styles from "./paginator.module.css";

type Props = {
    totalItemsCount:number,
    pageSize:number,
    currentPage:number,
    onPageChanged:(pageNumber:number)=>void,
    portionSize?:number
}

let Paginator:React.FC<Props> = ({totalItemsCount,pageSize,currentPage,onPageChanged,portionSize=10}) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++){
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);

    let [portionNumber,setPortionNumber] = useState(1);

    let leftPortionPageNumber = (portionNumber - 1) *portionSize + 1;
    let rightPortionPageNumber = portionNumber*portionSize;
    return <div className={styles.block}>
        {portionNumber > 1 &&
            <button className={styles.btn} onClick={()=>
            {setPortionNumber(portionNumber - 1)}
            }>PREV</button>}
        {
            pages
                .filter(p=> p>=leftPortionPageNumber && p<=rightPortionPageNumber)
                .map((p)=>
                {
                    return <span
                        key={p}
                        className={(currentPage === p && styles.selectedPage)+" "+ styles.numberPage}
                        onClick={(e) => { onPageChanged(p); }}>{p}</span>})}

        { portionCount > portionNumber &&
            <button className={styles.btn} onClick={() => {setPortionNumber(portionNumber + 1) }}>NEXT</button>
        }
    </div>






}






export default Paginator;