import { createAsyncThunk } from '@reduxjs/toolkit';
import { Timestamp } from 'firebase/firestore';
import { HistoryStatus, HistoryType } from 'services/enums';
import CloudStorage from 'services/models/cloudStorage';
import History from 'services/models/history';
import Trash from 'services/models/trash';
import { processData } from './helpers';

export default class TrashAction {
  static fetchTrashs = createAsyncThunk(
    'trashs/fetchTrashs',
    async (_, { dispatch, getState }) => {
      const trashsFromAPI = await Trash.getTrashs();
      const linkTrashs = processData(getState(), dispatch);

      return await linkTrashs(trashsFromAPI);
    }
  );

  static deleteTrash = (drawerData) => async (dispatch) => {
    try {
      const { id } = drawerData.trash;

      const trash = await Trash.getTrashById(id);

      const { vendor_id, image } = trash;

      const { id: _, ...newHistory } = new History({
        type: HistoryType.product,
        status: HistoryStatus.delete,
        vendor_id,
        user_id: drawerData.user_id,
        created_at: Timestamp.now(),
      });

      await CloudStorage.deleteImage(image);
      await Trash.delete(id, newHistory);
      dispatch(this.fetchTrashs());
    } catch (error) {
      console.log(error);
    }
  };
}
