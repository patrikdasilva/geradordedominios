import ItemModel from "../models/item.model.js";

class ItemService {
    getItemsByType = function (type) {
        const item = ItemModel.find({type: type});

        if(item) 
            return item
        else 
            return {
                error: {
                    "error": 500,
                    "message": "Não foi possível econtrar o item"
                }
            }
    }

    create = function (item) {
        item = ItemModel.create(item);
        
        if(item) 
            return item
        else 
            return {
                error: {
                    "error": 500,
                    "message": "Não foi possível adicionar um item"
                }
            }
    }

    delete = function (id) {
        ItemModel.findByIdAndRemove(id, function (err,res) {
            if(err)
                return err;
            else
                return res;
        });
    }
}

export default new ItemService();