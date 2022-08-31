import { Kmod } from "../../../archive/WoodProperties/Kmod";

export default function CalcKmod1(charging: string, woodType: string) {

    return (
        Kmod.kmod1
            .find((item) => {
                return (
                    charging === item.id
                )
            })
            .type.find((item) => {
                return (
                    woodType === item.name
                )
            }).value)
}
