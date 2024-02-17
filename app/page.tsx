import AddPlayerDialog from "@/components/home/AddPlayerDialog";
import GroupPlayerList from "@/components/home/GroupPlayerList";
import PlayerList from "@/components/home/PlayerList";
import SearchInput from "@/components/home/SearchInput";
export default function Home() {
  return (
    <div className="flex relative flex-col pb-10">
      <div className="sticky top-16 pb-3 bg-background pt-2">
        <SearchInput />
      </div>
      <div className="flex flex-col gap-4 py-2">
        <GroupPlayerList />
        <PlayerList />
      </div>
      <AddPlayerDialog />
    </div >
  );
}
