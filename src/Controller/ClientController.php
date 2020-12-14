<?php

namespace App\Controller;

use App\Entity\Assign;
use App\Entity\Client;
use App\Repository\ClientRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Repository\ComputerRepository;

class ClientController extends AbstractController
{
    /**
     * @Route("/api/client/search", name="autocomplete", methods={"GET"})
     */
    public function autocomplete(Request $request, ClientRepository $clientRepository, SerializerInterface $serializer): JsonResponse
    {
        $data = $request->get('client');
        $clients = $clientRepository->findClients($data);
        $json = $serializer->serialize($clients, 'json', ['groups' => 'searchClient']);
        $response = new JsonResponse($json, 200, [], true);
        return $response;
    }



    /**
     * @Route("/api/client/create", name="createClient", methods={"POST"})
     */
    public function create(Request $request, ComputerRepository $computerRepository, SerializerInterface $serializer)
    {
        $data = json_decode($request->getContent(), true);
        $client = new Client();
        $client->setName($data['name']);
        $client->setSurname($data['surname']);
        $doctrine = $this->getDoctrine()->getManager();
        $doctrine->persist($client);

        $computer = $computerRepository->find($data['desktop']);
        $date = new \DateTime($data['date']);

        $attribution = new Assign();
        $attribution->setHours($data['hours']);
        $attribution->setDate($date);
        $attribution->setClient($client);
        $attribution->setComputer($computer);
        $doctrine->persist($attribution);
        $doctrine->flush();

        $responseData = [
            "message" => "Créneau réservé",
            "content" => $attribution,
        ];

        $json = $serializer->serialize($responseData, 'json', ['groups' => 'clientinfo']);
        $response = new JsonResponse($json, 200, [], true);
        return $response;
    }
}
