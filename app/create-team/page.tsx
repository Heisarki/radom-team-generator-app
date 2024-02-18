import AddPlayerDrawer from "@/components/createTeam/AddPlayerDrawer";
import GroupPlayerList from "@/components/createTeam/GroupPlayerList";
import PlayerList from "@/components/createTeam/PlayerList";
import CreatedTeamDialog from "@/components/createTeam/CreatedTeamDialog";
import CreateTeamSettingDialog from "@/components/createTeam/CreateTeamSettingDialog";
import SearchInputWithSetting from "@/components/createTeam/SearchInputWithSetting";

export default function CreateTeam() {
    return (
        <div className="flex relative flex-col pb-10">
            <SearchInputWithSetting />
            <div className="flex flex-col gap-4 py-2">
                <GroupPlayerList />
                <PlayerList />
            </div>
            <AddPlayerDrawer />
            <CreatedTeamDialog />
            <CreateTeamSettingDialog />
        </div >
    );
}
