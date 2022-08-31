import { Kmod } from "../../../archive/WoodProperties/Kmod";

export default function CalcKmod2(humidityClass: string, woodType: string) {

    return (
        Kmod.kmod2
            .find((item) => {
                return (
                    humidityClass === item.id
                )
            })
            .type.find((item) => {
                return (
                    woodType === item.name
                )
            }).value)
}
