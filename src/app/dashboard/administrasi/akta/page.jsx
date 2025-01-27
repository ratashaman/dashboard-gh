
export default function RingkasanPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [listPengajuanAkta, setListPengajuanAkta] = useState([]);

  const getListPengajuanAkta = async () => {
    // try {
    //   const { data } = await get("akta/list");
    //   cl(data);
    // } catch (error) {
    //   cl(error);
    // }
  };

  const addPengajuanAkta = async (payload) => {
    // try {
    //   const { data } = await post("akta/add", payload);
    //   cl(data);
    // } catch (error) {
    //   cl(error);
    // }
  };

  const editPengajuanAkta = async (id, payload) => {
    // try {
    //   const { data } = await put("akta/edit/" + id, payload);
    //   cl(data);
    // } catch (error) {
    //   cl(error);
    // }
  };

  const delPengajuanAkta = async (id) => {
    // try {
    //   const { data } = await del("akta/delete/" + id);
    //   cl(data);
    // } catch (error) {
    //   cl(error);
    // }
  };

  useEffect(() => {
    const asyncFunc = async () => {
      await getListPengajuanAkta();
      setIsLoading(false);
    };

    asyncFunc();
  }, []);

  return (
    <ListPengajuanAkta
      listPengajuanAkta={listPengajuanAkta}
      isLoading={isLoading}
      addPengajuanAkta={addPengajuanAkta}
      editPengajuanAkta={editPengajuanAkta}
      delPengajuanAkta={delPengajuanAkta}
    />
  );
}

