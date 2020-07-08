/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import ProductListQuery from 'Query/ProductList.query';
import { updateNoMatch } from 'Store/NoMatch';
import { showNotification } from 'Store/Notification';
import {
    updateInfoLoadStatus,
    updateProductListInfo
} from 'Store/ProductListInfo';
import { QueryDispatcher } from 'Util/Request';

/**
 * Product List Info Dispatcher
 * @class ProductListInfoDispatcher
 * @extends QueryDispatcher
 */
export class ProductListInfoDispatcher extends QueryDispatcher {
    constructor() {
        super('ProductListInfo');
    }

    onSuccess({ products }, dispatch) {
        dispatch(updateProductListInfo(products));
    }

    onError(error, dispatch) {
        dispatch(showNotification('error', 'Error fetching Product List Information!', error));
        dispatch(updateNoMatch(true));
    }

    prepareRequest(options, dispatch) {
        dispatch(updateInfoLoadStatus(true));
        return ProductListQuery.getQuery({
            ...options,
            requireInfo: true
        });
    }
}

export default new ProductListInfoDispatcher();
