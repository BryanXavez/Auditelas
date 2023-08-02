import React, { FC, useState, useEffect, useContext, useId } from 'react'
import { Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native'
import { styles } from '../theme/app.Theme';
import { listaDefectosInterface } from '../interfaces/listaDefectos'
import { TextoPantallas } from '../components/Constant';
import { black, blue, grey, navy, navyclaro, orange, purpura } from '../components/colores';
import { TelasContext } from '../context/telasContext';
import { InsertAuditelas } from '../interfaces/insertAuditelas';
import { reqResApiFinanza } from '../api/reqResApi';

type defectoCardProps = {
    item: listaDefectosInterface,
    index: number,
    //onPressPlus: (item: listaDefectosInterface, index: number, nivel: number) => void,
    //onPressMin: (item: listaDefectosInterface, index: number, nivel: number) => void,
}

export const AuditoriaProcess = () => {
    const [comentario, setComentario] = useState<string>("");
    const { changeRolloId, changeApVendRoll, changeNameAlias } = useContext(TelasContext);
    const { telasState } = useContext(TelasContext);
    const [YardasProveedor, setYardasProveedor] = useState<string>('')
    const [YardasReales, setYardasReales] = useState<string>('')

    const [Datos, setDatos] = useState<listaDefectosInterface[]>(
        [

        ]
    )
    const onPressEnviar = async () => {
        try {
            let enviar: InsertAuditelas[] = [];
            Datos.map(x => {
                enviar.push({
                    id_Auditor_Creacion: telasState.usuarioId,
                    id_Rollo: telasState.IdRollo,
                    id_Estado: 1,
                    id_Defecto: 1,
                    total_Defectos: x.Total,
                    nivel_1: x.Nivel_1,
                    nivel_2: x.Nivel_2,
                    nivel_3: x.Nivel_3,
                    nivel_4: x.Nivel_4,
                })
            })
            const request = await reqResApiFinanza.post<InsertAuditelas[]>('Auditelas/DatosRollosInsert', enviar);
            if (request.data.length > 0) {
                let x = 0;
                console.log(request.data[0])
            } else {
                console.log('No se modificó!')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const DefectosCard: FC<defectoCardProps> = ({ item, index, //onPressMin, onPressPlus 
    }) => {
        const onPressPlus = (item2: listaDefectosInterface, index: number, nivel: number) => {
            const nuevosDatos = [...Datos];
            switch (nivel) {
                case 1:
                    nuevosDatos[index].Nivel_1 = item2.Nivel_1 ? item2.Nivel_1 +1 : 0 + 1;
                    setDatos(nuevosDatos)
                    return

                case 2:
                    nuevosDatos[index].Nivel_2 = item2.Nivel_2 ? item2.Nivel_2 +1 : 0 + 1;
                    setDatos(nuevosDatos)
                    return

                case 3:
                    nuevosDatos[index].Nivel_3 = item2.Nivel_3 ? item2.Nivel_3 +1 : 0 + 1;
                    setDatos(nuevosDatos)
                    return

                case 4:
                    nuevosDatos[index].Nivel_4 = item2.Nivel_4 ? item2.Nivel_4 +1 : 0 + 1;
                    setDatos(nuevosDatos)
                    return
                default:
            }
        }
        const onPressMin = (item2: listaDefectosInterface, index: number, nivel: number) => {
            const nuevosDatos = [...Datos];
            switch (nivel) {
                case 1:
                    nuevosDatos[index].Nivel_1 = (item2.Nivel_1 - 1) >= 0 ? item2.Nivel_1 ? item2.Nivel_1 -1 : 0 - 1 : item2.Nivel_1;
                    setDatos(nuevosDatos)
                    return
                    break;
                case 2:
                    nuevosDatos[index].Nivel_2 = (item2.Nivel_2 - 1) >= 0 ? item2.Nivel_2 ? item2.Nivel_2 -1 : 0 - 1 : item2.Nivel_2;
                    setDatos(nuevosDatos)
                    return
                    break;
                case 3:
                    nuevosDatos[index].Nivel_3 = (item2.Nivel_3 - 1) >= 0 ? item2.Nivel_3 ? item2.Nivel_3 -1 : 0 - 1 : item2.Nivel_3;
                    setDatos(nuevosDatos)
                    return
                    break;
                case 4:
                    nuevosDatos[index].Nivel_4 = (item2.Nivel_4 - 1) >= 0 ? item2.Nivel_4 ? item2.Nivel_4 -1 : 0 - 1 : item2.Nivel_4;
                    setDatos(nuevosDatos)
                    return
                default:
            }
        }
        return (
            <View style={{ width: '100%', flexDirection: 'row', alignContent: 'center' }}>
                <View style={styles.contenedorNiveldefectos
                }>
                    <View style={{ width: '100%', marginHorizontal: 3 }}>
                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <Text style={styles.textRender}>{item.descripcion}</Text>
                        </View>
                        <View style={styles.nivelDefectosStilos}>
                            <View style={{ width: '60%' }}>
                                <Text style={styles.textRender}>Nivel 1: </Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignContent: 'center', width: '40%' }}>
                                <View style={{ width: '33%' }}>
                                    <TouchableOpacity style={styles.botonSumaResta}
                                        onPress={() => onPressMin(item, index, 1)
                                        }
                                    >
                                        <Text style={{ color: 'white', fontSize: TextoPantallas }}>-</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '33%', alignItems: 'center' }}>
                                    <Text style={styles.textRender}>{item.Nivel_1 ? item.Nivel_1 : 0}</Text>
                                </View>
                                <View style={{ width: '33%' }}>
                                    <TouchableOpacity style={styles.botonSumaResta}

                                        onPress={() => onPressPlus(item, index, 1)
                                        }
                                    >
                                        <Text style={{ color: 'white', fontSize: TextoPantallas }}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.nivelDefectosStilos}>
                            <View style={{ width: '60%' }}>
                                <Text style={styles.textRender}>Nivel 2: </Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignContent: 'center', width: '40%' }}>
                                <View style={{ width: '33%' }}>
                                    <TouchableOpacity style={styles.botonSumaResta}
                                        onPress={() => onPressMin(item, index, 2)
                                        }
                                    >
                                        <Text style={{ color: 'white', fontSize: TextoPantallas }}>-</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '33%', alignItems: 'center' }}>
                                    <Text style={styles.textRender}>{item.Nivel_2 ? item.Nivel_2 : 0}</Text>
                                </View>
                                <View style={{ width: '33%' }}>
                                    <TouchableOpacity style={styles.botonSumaResta}
                                        onPress={() => onPressPlus(item, index, 2)
                                        }
                                    >
                                        <Text style={{ color: 'white', fontSize: TextoPantallas }}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.nivelDefectosStilos}>
                            <View style={{ width: '60%' }}>
                                <Text style={styles.textRender}>Nivel 3: </Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignContent: 'center', width: '40%' }}>
                                <View style={{ width: '33%' }}>
                                    <TouchableOpacity style={styles.botonSumaResta}
                                        onPress={() => onPressMin(item, index, 3)
                                        }
                                    >
                                        <Text style={{ color: 'white', fontSize: TextoPantallas }}>-</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '33%', alignItems: 'center' }}>
                                    <Text style={styles.textRender}>{item.Nivel_3 ? item.Nivel_3 : 0}</Text>
                                </View>
                                <View style={{ width: '33%' }}>
                                    <TouchableOpacity style={styles.botonSumaResta}
                                        onPress={() => onPressPlus(item, index, 3)
                                        }
                                    >
                                        <Text style={{ color: 'white', fontSize: TextoPantallas }}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.nivelDefectosStilos}>
                            <View style={{ width: '60%' }}>
                                <Text style={styles.textRender}>Nivel 4: </Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignContent: 'center', width: '40%' }}>
                                <View style={{ width: '33%' }}>
                                    <TouchableOpacity style={styles.botonSumaResta}
                                        onPress={() => onPressMin(item, index, 4)
                                        }
                                    >
                                        <Text style={{ color: 'white', fontSize: TextoPantallas }}>-</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '33%', alignItems: 'center' }}>
                                    <Text style={styles.textRender}>{item.Nivel_4 ? item.Nivel_4 : 0}</Text>
                                </View>
                                <View style={{ width: '33%' }}>
                                    <TouchableOpacity style={styles.botonSumaResta}
                                        onPress={() => onPressPlus(item, index, 4)
                                        }
                                    >
                                        <Text style={{ color: 'white', fontSize: TextoPantallas }}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{ borderRadius: 5, alignItems: 'center' }}>
                            <Text style={styles.textRender}>Total: { ((item.Nivel_1 ? item.Nivel_1 : 0) + ((item.Nivel_2 ? item.Nivel_2 : 0) * 2) + ((item.Nivel_3 ? item.Nivel_3 : 0) * 3) + ((item.Nivel_4 ? item.Nivel_4 : 0) * 4))}</Text>
                        </View>
                    </View >
                </View>
            </View>
        )
    }

    const GetData = async () => {

        const request = await reqResApiFinanza.get<listaDefectosInterface[]>('Auditelas/DatosDefectosTelas')
        console.log(request.data)

        setDatos(request.data)

        /*let data: listaDefectosInterface[] = [
            { Id: 1, NombreDefecto: 'Hilo Grueso en trama', Nivel_1: 0, Nivel_2: 0, Nivel_3: 0, Nivel_4: 0, Cantidad: 0, Total: 7 },
            { Id: 2, NombreDefecto: 'Hilo Grueso en urdimbre', Nivel_1: 0, Nivel_2: 0, Nivel_3: 0, Nivel_4: 0, Cantidad: 0, Total: 24 },
            { Id: 3, NombreDefecto: 'Faltante de hilo en trama', Nivel_1: 0, Nivel_2: 0, Nivel_3: 0, Nivel_4: 0, Cantidad: 0, Total: 7 },
            { Id: 4, NombreDefecto: 'Faltante de hilo en urdimbre', Nivel_1: 0, Nivel_2: 0, Nivel_3: 0, Nivel_4: 0, Cantidad: 0, Total: 24 },
            { Id: 5, NombreDefecto: 'Franjas de colores', Nivel_1: 0, Nivel_2: 0, Nivel_3: 0, Nivel_4: 0, Cantidad: 0, Total: 24 },
            { Id: 6, NombreDefecto: 'Plises', Nivel_1: 0, Nivel_2: 0, Nivel_3: 0, Nivel_4: 0, Cantidad: 0, Total: 7 },
            { Id: 7, NombreDefecto: 'Hilos de colores', Nivel_1: 0, Nivel_2: 0, Nivel_3: 0, Nivel_4: 0, Cantidad: 0, Total: 24 },
            { Id: 8, NombreDefecto: 'Arrugas', Nivel_1: 0, Nivel_2: 0, Nivel_3: 0, Nivel_4: 0, Cantidad: 0, Total: 7 },
            { Id: 9, NombreDefecto: 'Hilo suelto', Nivel_1: 0, Nivel_2: 0, Nivel_3: 0, Nivel_4: 0, Cantidad: 0, Total: 24 },
            { Id: 10, NombreDefecto: 'Nudos', Nivel_1: 0, Nivel_2: 0, Nivel_3: 0, Nivel_4: 0, Cantidad: 0, Total: 24 },
            { Id: 11, NombreDefecto: 'Faltante de licra', Nivel_1: 0, Nivel_2: 0, Nivel_3: 0, Nivel_4: 0, Cantidad: 0, Total: 7 },
            { Id: 12, NombreDefecto: 'Desgaste', Nivel_1: 0, Nivel_2: 0, Nivel_3: 0, Nivel_4: 0, Cantidad: 0, Total: 24 },
            { Id: 13, NombreDefecto: 'Piel de naranja', Nivel_1: 0, Nivel_2: 0, Nivel_3: 0, Nivel_4: 0, Cantidad: 0, Total: 24 },
            { Id: 14, NombreDefecto: 'Mal teñido', Nivel_1: 0, Nivel_2: 0, Nivel_3: 0, Nivel_4: 0, Cantidad: 0, Total: 24 },
            { Id: 15, NombreDefecto: 'Hoyos', Nivel_1: 0, Nivel_2: 0, Nivel_3: 0, Nivel_4: 0, Cantidad: 0, Total: 24 },
            { Id: 16, NombreDefecto: 'Uniones/Traslapes', Nivel_1: 0, Nivel_2: 0, Nivel_3: 0, Nivel_4: 0, Cantidad: 0, Total: 24 },
            { Id: 17, NombreDefecto: 'Manchas', Nivel_1: 0, Nivel_2: 0, Nivel_3: 0, Nivel_4: 0, Cantidad: 0, Total: 24 },
            { Id: 18, NombreDefecto: 'Barrado', Nivel_1: 0, Nivel_2: 0, Nivel_3: 0, Nivel_4: 0, Cantidad: 0, Total: 24 },
            { Id: 19, NombreDefecto: 'Otros', Nivel_1: 0, Nivel_2: 0, Nivel_3: 0, Nivel_4: 0, Cantidad: 0, Total: 24 },
        ]*/
        //setDatos(data)
    }

    useEffect(() => {
        GetData()
    }, [])

    return (
        <View style={{ alignItems: 'center', flex: 1 }}>
            <View style={{ backgroundColor: grey, borderWidth: 1 }}>
                <Text style={{ fontSize: 14, color: 'black', fontWeight: 'bold' }}>Tela: {telasState.nameAlias} - {telasState.rollId} - {telasState.apVendRoll}</Text>
            </View>
            <View style={styles.contenedorDatosRollo}>
                <Text style={{ fontWeight: 'bold', fontSize: 12, color: 'black' }}>
                    Ancho Real:
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.viewsAuditoria}>
                        <TextInput placeholder='Inicio' textAlign='center' keyboardType='decimal-pad' placeholderTextColor={grey} style={{ color: black, backgroundColor: 'white' }}></TextInput>
                    </View>
                    <View style={styles.viewsAuditoria}>
                        <TextInput placeholder='Medio' textAlign='center' keyboardType='decimal-pad' placeholderTextColor={grey} style={{ color: black, backgroundColor: 'white' }}></TextInput>
                    </View>
                    <View style={styles.viewsAuditoria}>
                        <TextInput placeholder='Final' textAlign='center' keyboardType='decimal-pad' placeholderTextColor={grey} style={{ color: black, backgroundColor: 'white' }}></TextInput>
                    </View>
                </View>
                <Text style={{ fontWeight: 'bold', fontSize: 12, color: 'black' }}>
                    Yardas Reales:
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.viewsAuditoria}>
                        <TextInput placeholder='Yardas Proveedor'
                            value={YardasProveedor}
                            onChangeText={(value) => setYardasProveedor(value)}
                            textAlign='center' keyboardType='decimal-pad'
                            placeholderTextColor={grey} style={{ color: black, backgroundColor: 'white' }}></TextInput>
                    </View>
                    <View style={styles.viewsAuditoria}>
                        <TextInput placeholder='Yardas Reales'
                            value={YardasReales}
                            onChangeText={(value) => setYardasReales(value)}
                            textAlign='center' keyboardType='decimal-pad'
                            placeholderTextColor={grey} style={{ color: black, backgroundColor: 'white' }}></TextInput>
                    </View>
                    <View style={styles.viewsAuditoria}>
                        <TextInput editable={false} placeholder='Diferencia'
                            value={(parseFloat(YardasProveedor == '' ? '0' : YardasProveedor) - parseFloat(YardasReales == '' ? '' : YardasReales)).toString()}
                            textAlign='center' keyboardType='decimal-pad'
                            placeholderTextColor={grey} style={{ color: black, backgroundColor: 'white' }}></TextInput>
                    </View>
                </View>
                <Text style={{ fontWeight: 'bold', fontSize: 12, color: 'black' }}>
                    Comentarios:
                </Text>
                <View style={{ width: '60%', margin: 2, borderRadius: 5, borderWidth: 1, backgroundColor: 'white' }}>
                    <TextInput
                        style={{ color: black }}
                        placeholderTextColor={grey}
                        multiline={true}
                        onChangeText={(value) => setComentario(value)}
                        value={comentario}
                        maxLength={300}
                    />
                </View>
            </View>
            <TouchableOpacity
                style={{ width: '90%' }}
                activeOpacity={0.5}
                onPress={() => onPressEnviar()}
            >
                <View style={[styles.button, { backgroundColor: orange, height: 41, width: '50%', alignSelf: 'center' }]}>
                    <Text style={styles.text}>Enviar Auditoria</Text>
                </View>
            </TouchableOpacity>
            <View style={{ flex: 1, width: '100%', maxWidth: 600, borderWidth: 1, marginTop: 10 }}>
                <FlatList
                    data={Datos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => <DefectosCard index={index} item={item} //onPressMin={onPressMin} onPressPlus={onPressPlus} 
                    />}
                    style={{ flex: 1, width: '100%' }}>
                </FlatList>
            </View>
        </View>
    )
}