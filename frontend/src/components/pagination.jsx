import React from "react";
import _ from 'lodash';

const Pagination = props => {
    const numberOfPages = Math.ceil(props.eventsCount / props.pageSize);
    if (numberOfPages === 1) return null;
    const pages = _.range(1, numberOfPages + 1);
    return <nav>
        <ul className="pagination">
            {pages.map(page =>
                <li key={page} className={page === props.currentPage ? 'page-item active' : 'page-item'}>
                    <a className="page-link" onClick={async () => await props.onPageChange(page)}>{page}</a>
                </li>)}
        </ul>
    </nav>;
};

export default Pagination;