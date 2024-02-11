import GroupPlayerList from "@/components/home/GroupPlayerList";
import PlayerList from "@/components/home/PlayerList";
import SearchInput from "@/components/home/SearchInput";
export default function Home() {
  return (
    <div className="flex relative flex-col">
      <div className="sticky top-16 bg-background-900 pb-3">
        <SearchInput />
      </div>
      <div className="flex flex-col gap-4 py-2">
        <GroupPlayerList />
        {/* <GroupPlayerList />
        <GroupPlayerList />
        <GroupPlayerList />
        <GroupPlayerList />
        <GroupPlayerList />
        <GroupPlayerList />
        <GroupPlayerList /> */}

        <PlayerList />
      </div>
    </div>
  );
}